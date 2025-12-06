"use client";

import { useEffect, useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, AlertCircle, ExternalLink, Info } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";

interface ChemicalEnrichmentProps {
  casNumber: string;
  ingredientName: string;
}

interface PubChemEnrichmentData {
  // Identifiers
  iupacName?: string;
  canonicalSMILES?: string;
  inchi?: string;
  inchikey?: string;
  
  // Synonyms
  synonyms?: string[];
  
  // Properties
  xlogP?: number;
  tpsa?: number;
  complexity?: number;
  hBondDonorCount?: number;
  hBondAcceptorCount?: number;
  rotatableBondCount?: number;
  exactMass?: number;
  
  // Safety & Toxicity (from description endpoint)
  safetyHazards?: string[];
  toxicityData?: Array<{
    type: string;
    value: string;
    route?: string;
    species?: string;
  }>;
  
  // PubChem CID for linking
  cid?: string;
}

export function ChemicalEnrichment({ casNumber, ingredientName }: ChemicalEnrichmentProps) {
  const [data, setData] = useState<PubChemEnrichmentData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    
    if (!casNumber) {
      setIsLoading(false);
      return;
    }

    async function fetchEnrichmentData() {
      if (!mountedRef.current) return;
      setIsLoading(true);
      setError(null);

      try {
        const casQuery = casNumber.replace(/-/g, "");
        const queries = [casNumber, casQuery, ingredientName];

        // Helper to create timeout signal
        const createTimeoutSignal = (ms: number) => {
          const controller = new AbortController();
          setTimeout(() => controller.abort(), ms);
          return controller.signal;
        };

        // Get CID
        let cid: string | null = null;
        for (const query of queries) {
          try {
            const cidResponse = await fetch(
              `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/${encodeURIComponent(query)}/cids/JSON`,
              { 
                headers: { Accept: "application/json" },
                signal: createTimeoutSignal(5000)
              }
            );

            if (cidResponse.ok) {
              const cidData = await cidResponse.json();
              if (cidData.IdentifierList?.CID?.[0]) {
                cid = cidData.IdentifierList.CID[0].toString();
                break;
              }
            }
          } catch (err) {
            continue;
          }
        }

        if (!cid) {
          throw new Error(`Compound not found in PubChem for CAS: ${casNumber}`);
        }

        // Fetch only essential enrichment data
        const [propertiesRes, synonymsRes] = await Promise.all([
          fetch(
            `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/${cid}/property/IUPACName,XLogP/JSON`,
            { 
              headers: { Accept: "application/json" },
              signal: createTimeoutSignal(5000)
            }
          ),
          fetch(
            `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/${cid}/synonyms/JSON`,
            { 
              headers: { Accept: "application/json" },
              signal: createTimeoutSignal(5000)
            }
          )
        ]);

        const enrichmentData: PubChemEnrichmentData = { cid };

        // Parse properties
        if (propertiesRes.ok) {
          const propertiesData = await propertiesRes.json();
          const props = propertiesData.PropertyTable?.Properties?.[0];
          if (props) {
            enrichmentData.iupacName = props.IUPACName;
            enrichmentData.xlogP = props.XLogP ? Number(props.XLogP) : undefined;
          }
        }

        // Parse synonyms
        if (synonymsRes.ok) {
          const synonymsData = await synonymsRes.json();
          const synonymList = synonymsData.InformationList?.Information?.[0]?.Synonym;
          if (Array.isArray(synonymList)) {
            // Filter out the ingredient name itself and limit to top 5
            enrichmentData.synonyms = synonymList
              .filter((s: string) => s.toLowerCase() !== ingredientName.toLowerCase())
              .slice(0, 5);
          }
        }

        if (mountedRef.current) {
          setData(enrichmentData);
        }
      } catch (err) {
        if (mountedRef.current) {
          const errorMessage = err instanceof Error ? err.message : "Failed to fetch enrichment data";
          setError(errorMessage);
          console.error("PubChem enrichment error:", err);
        }
      } finally {
        if (mountedRef.current) {
          setIsLoading(false);
        }
      }
    }

    fetchEnrichmentData();

    return () => {
      mountedRef.current = false;
    };
  }, [casNumber, ingredientName]);

  if (!casNumber) {
    return null;
  }

  if (isLoading) {
    return (
      <Card>
        <CardHeader className="space-y-1.5">
          <CardTitle className="flex items-center gap-2">
            <Info className="h-4 w-4 text-muted-foreground" />
            Chemical Enrichment
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground mb-2" />
            <span className="text-xs text-muted-foreground">Loading enrichment data...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader className="space-y-1.5">
          <CardTitle className="flex items-center gap-2">
            <Info className="h-4 w-4 text-muted-foreground" />
            Chemical Enrichment
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Alert variant="destructive" className="border-destructive/50">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="text-xs mt-1">
              Unable to load enrichment data. {error.includes("not found") 
                ? "This compound may not be in PubChem database." 
                : "Please check your connection and try again."}
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  if (!data) {
    return null;
  }

  const pubchemUrl = data.cid 
    ? `https://pubchem.ncbi.nlm.nih.gov/compound/${data.cid}`
    : null;

  // Only show if we have meaningful data
  const hasUsefulData = data.iupacName || (data.synonyms && data.synonyms.length > 0) || data.xlogP !== undefined;
  
  if (!hasUsefulData) {
    return null;
  }

  return (
    <Card>
      <CardHeader className="space-y-1.5 pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm">Additional Information</CardTitle>
          {pubchemUrl && (
            <a
              href={pubchemUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-muted-foreground hover:text-primary flex items-center gap-1"
            >
              PubChem
              <ExternalLink className="h-3 w-3" />
            </a>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {/* IUPAC Name */}
        {data.iupacName && (
          <div className="space-y-1">
            <p className="text-xs font-medium text-muted-foreground">IUPAC Name</p>
            <p className="text-sm leading-relaxed">{data.iupacName}</p>
          </div>
        )}

        {/* Key Synonyms - limit to 5 */}
        {data.synonyms && data.synonyms.length > 0 && (
          <div className="space-y-1.5">
            <p className="text-xs font-medium text-muted-foreground">Also Known As</p>
            <div className="flex flex-wrap gap-1.5">
              {data.synonyms.slice(0, 5).map((synonym, idx) => (
                <Badge key={idx} variant="outline" className="text-xs">
                  {synonym}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Key Properties - just Log P */}
        {data.xlogP !== undefined && (
          <div className="grid grid-cols-2 gap-4 pt-1 border-t">
            <div>
              <p className="text-xs font-medium text-muted-foreground">Log P</p>
              <p className="text-sm font-medium">{data.xlogP.toFixed(2)}</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

