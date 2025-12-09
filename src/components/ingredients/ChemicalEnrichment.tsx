"use client";

import { useEffect, useState, useRef, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Loader2,
  AlertCircle,
  ExternalLink,
  FlaskConical,
  Flame,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { ChemicalStructureImage } from "./ChemicalStructureImage";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface ChemicalEnrichmentProps {
  casNumber: string;
  ingredientName: string;
}

interface PubChemEnrichmentData {
  molecularFormula?: string;
  molecularWeight?: number;
  xlogP?: number;
  tpsa?: number;
  complexity?: number;
  hBondDonorCount?: number;
  hBondAcceptorCount?: number;
  rotatableBondCount?: number;
  heavyAtomCount?: number;
  exactMass?: number;
  synonyms?: string[];
  meltingPoint?: string;
  solubility?: string;
  ghsSignalWord?: string;
  ghsHazardStatements?: string[];
  cid?: string;
}

// Lipinski's Rule of 5 + Veber's Rules for bioavailability
interface DrugLikenessProfile {
  lipinskiScore: number; // 0-4 rules passed
  lipinskiViolations: string[];
  veberCompliant: boolean;
  overallScore: number; // 0-100
  interpretation: "Excellent" | "Good" | "Moderate" | "Poor";
}

function calculateDrugLikeness(
  data: PubChemEnrichmentData,
): DrugLikenessProfile | null {
  const {
    molecularWeight,
    xlogP,
    hBondDonorCount,
    hBondAcceptorCount,
    tpsa,
    rotatableBondCount,
  } = data;

  // Need at least MW and LogP to calculate
  if (molecularWeight === undefined || xlogP === undefined) return null;

  const violations: string[] = [];
  let lipinskiScore = 4;

  // Lipinski's Rule of 5
  if (molecularWeight > 500) {
    violations.push(`MW ${molecularWeight.toFixed(0)} > 500`);
    lipinskiScore--;
  }
  if (xlogP > 5) {
    violations.push(`LogP ${xlogP.toFixed(1)} > 5`);
    lipinskiScore--;
  }
  if (hBondDonorCount !== undefined && hBondDonorCount > 5) {
    violations.push(`HBD ${hBondDonorCount} > 5`);
    lipinskiScore--;
  }
  if (hBondAcceptorCount !== undefined && hBondAcceptorCount > 10) {
    violations.push(`HBA ${hBondAcceptorCount} > 10`);
    lipinskiScore--;
  }

  // Veber's Rules (for oral bioavailability)
  const tpsaOk = tpsa === undefined || tpsa <= 140;
  const rotBondsOk =
    rotatableBondCount === undefined || rotatableBondCount <= 10;
  const veberCompliant = tpsaOk && rotBondsOk;

  // Calculate overall score (weighted)
  // Lipinski: 60%, Veber: 40%
  const lipinskiPct = (lipinskiScore / 4) * 60;
  const veberPct = veberCompliant
    ? 40
    : (tpsaOk ? 20 : 0) + (rotBondsOk ? 20 : 0);
  const overallScore = Math.round(lipinskiPct + veberPct);

  let interpretation: DrugLikenessProfile["interpretation"];
  if (overallScore >= 85) interpretation = "Excellent";
  else if (overallScore >= 70) interpretation = "Good";
  else if (overallScore >= 50) interpretation = "Moderate";
  else interpretation = "Poor";

  return {
    lipinskiScore,
    lipinskiViolations: violations,
    veberCompliant,
    overallScore,
    interpretation,
  };
}

// Expandable Safety Warning Component
function SafetyWarningSection({
  signalWord,
  hazardStatements,
}: {
  signalWord: string;
  hazardStatements: string[];
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const isDanger = signalWord.toUpperCase() === "DANGER";
  const hasMultiple = hazardStatements.length > 1;

  return (
    <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
      <div
        className={`rounded-md border overflow-hidden ${
          isDanger ? "bg-red-50 border-red-200" : "bg-amber-50 border-amber-200"
        }`}
      >
        <CollapsibleTrigger asChild>
          <button
            className={`w-full p-3 flex items-start gap-2.5 text-left ${
              isDanger
                ? "text-red-800 hover:bg-red-100/50"
                : "text-amber-800 hover:bg-amber-100/50"
            } transition-colors`}
          >
            <Flame className="h-4 w-4 shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-sm">{signalWord}</span>
                {hasMultiple && (
                  <Badge
                    variant="outline"
                    className={`text-[10px] h-4 px-1.5 ${
                      isDanger
                        ? "border-red-300 text-red-700"
                        : "border-amber-300 text-amber-700"
                    }`}
                  >
                    {hazardStatements.length} hazards
                  </Badge>
                )}
              </div>
              {hazardStatements[0] && !isExpanded && (
                <p className="text-xs opacity-80 mt-0.5 truncate">
                  {hazardStatements[0]}
                </p>
              )}
            </div>
            {hasMultiple &&
              (isExpanded ? (
                <ChevronUp className="h-4 w-4 shrink-0 opacity-60" />
              ) : (
                <ChevronDown className="h-4 w-4 shrink-0 opacity-60" />
              ))}
          </button>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div
            className={`px-3 pb-3 pt-0 space-y-1.5 border-t ${
              isDanger ? "border-red-200" : "border-amber-200"
            }`}
          >
            {hazardStatements.map((statement, idx) => (
              <p
                key={idx}
                className={`text-xs ${isDanger ? "text-red-700" : "text-amber-700"}`}
              >
                • {statement}
              </p>
            ))}
          </div>
        </CollapsibleContent>
      </div>
    </Collapsible>
  );
}

export function ChemicalEnrichment({
  casNumber,
  ingredientName,
}: ChemicalEnrichmentProps) {
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
              { signal: createTimeoutSignal(5000) },
            );
            if (cidResponse.ok) {
              const cidData = await cidResponse.json();
              if (cidData.IdentifierList?.CID?.[0]) {
                cid = cidData.IdentifierList.CID[0].toString();
                break;
              }
            }
          } catch {
            continue;
          }
        }

        if (!cid) throw new Error(`Compound not found in PubChem`);

        // Fetch all data in parallel - expanded property list
        const [propertiesRes, synonymsRes, experimentalRes, safetyRes] =
          await Promise.all([
            fetch(
              `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/${cid}/property/MolecularWeight,MolecularFormula,XLogP,ExactMass,TPSA,HBondDonorCount,HBondAcceptorCount,RotatableBondCount,Complexity,HeavyAtomCount/JSON`,
              { signal: createTimeoutSignal(5000) },
            ),
            fetch(
              `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/${cid}/synonyms/JSON`,
              { signal: createTimeoutSignal(5000) },
            ),
            fetch(
              `https://pubchem.ncbi.nlm.nih.gov/rest/pug_view/data/compound/${cid}/JSON?heading=Experimental+Properties`,
              { signal: createTimeoutSignal(8000) },
            ).catch(() => null),
            fetch(
              `https://pubchem.ncbi.nlm.nih.gov/rest/pug_view/data/compound/${cid}/JSON?heading=GHS+Classification`,
              { signal: createTimeoutSignal(8000) },
            ).catch(() => null),
          ]);

        const enrichmentData: PubChemEnrichmentData = { cid };

        // Parse properties
        if (propertiesRes.ok) {
          const pd = await propertiesRes.json();
          const p = pd.PropertyTable?.Properties?.[0];
          if (p) {
            enrichmentData.molecularFormula = p.MolecularFormula;
            enrichmentData.molecularWeight = p.MolecularWeight
              ? Number(p.MolecularWeight)
              : undefined;
            enrichmentData.xlogP =
              p.XLogP !== undefined ? Number(p.XLogP) : undefined;
            enrichmentData.exactMass = p.ExactMass
              ? Number(p.ExactMass)
              : undefined;
            enrichmentData.tpsa =
              p.TPSA !== undefined ? Number(p.TPSA) : undefined;
            enrichmentData.hBondDonorCount = p.HBondDonorCount;
            enrichmentData.hBondAcceptorCount = p.HBondAcceptorCount;
            enrichmentData.rotatableBondCount = p.RotatableBondCount;
            enrichmentData.complexity = p.Complexity
              ? Number(p.Complexity)
              : undefined;
            enrichmentData.heavyAtomCount = p.HeavyAtomCount;
          }
        }

        // Parse synonyms
        if (synonymsRes.ok) {
          const sd = await synonymsRes.json();
          const list = sd.InformationList?.Information?.[0]?.Synonym;
          if (Array.isArray(list)) {
            enrichmentData.synonyms = list
              .filter(
                (s: string) => s.toLowerCase() !== ingredientName.toLowerCase(),
              )
              .slice(0, 5);
          }
        }

        // Parse experimental properties
        if (experimentalRes?.ok) {
          try {
            const ed = await experimentalRes.json();
            const sections = ed.Record?.Section?.[0]?.Section || [];
            const findValue = (heading: string) => {
              const section = sections.find(
                (s: any) => s.TOCHeading === heading,
              );
              return section?.Information?.find(
                (i: any) => i.Value?.StringWithMarkup?.[0]?.String,
              )?.Value?.StringWithMarkup?.[0]?.String;
            };
            enrichmentData.meltingPoint = findValue("Melting Point");
            enrichmentData.solubility = findValue("Solubility");
          } catch {}
        }

        // Parse safety data
        if (safetyRes?.ok) {
          try {
            const sd = await safetyRes.json();
            const ghsSection =
              sd.Record?.Section?.[0]?.Section?.[0]?.Section?.[0];
            if (ghsSection?.Information) {
              const signalInfo = ghsSection.Information.find(
                (i: any) => i.Name === "Signal",
              );
              enrichmentData.ghsSignalWord =
                signalInfo?.Value?.StringWithMarkup?.[0]?.String;
              const hazards = ghsSection.Information.filter(
                (i: any) => i.Name === "GHS Hazard Statements",
              )
                .map((i: any) => i.Value?.StringWithMarkup?.[0]?.String)
                .filter(Boolean);
              if (hazards.length)
                enrichmentData.ghsHazardStatements = hazards.slice(0, 10); // Get more hazard statements
            }
          } catch {}
        }

        if (mountedRef.current) setData(enrichmentData);
      } catch (err) {
        if (mountedRef.current) {
          setError(err instanceof Error ? err.message : "Failed to fetch");
          console.error("PubChem error:", err);
        }
      } finally {
        if (mountedRef.current) setIsLoading(false);
      }
    }

    fetchEnrichmentData();
    return () => {
      mountedRef.current = false;
    };
  }, [casNumber, ingredientName]);

  // Calculate drug-likeness profile
  const drugLikeness = useMemo(
    () => (data ? calculateDrugLikeness(data) : null),
    [data],
  );

  if (!casNumber) return null;

  if (isLoading) {
    return (
      <Card>
        <CardContent className="py-12">
          <div className="flex flex-col items-center justify-center">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground mb-2" />
            <span className="text-xs text-muted-foreground">
              Loading PubChem data...
            </span>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!data && error) {
    return (
      <Card>
        <CardContent className="pt-6">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="text-xs">
              Unable to load chemical data.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  if (!data) return null;

  const pubchemUrl = data.cid
    ? `https://pubchem.ncbi.nlm.nih.gov/compound/${data.cid}`
    : null;

  return (
    <TooltipProvider>
      <Card className="overflow-hidden">
        <CardHeader className="bg-muted/30 pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-semibold">
              Chemical Profile
            </CardTitle>
            {pubchemUrl && (
              <a
                href={pubchemUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-muted-foreground hover:text-primary flex items-center gap-1"
              >
                PubChem <ExternalLink className="h-3 w-3" />
              </a>
            )}
          </div>
        </CardHeader>

        <CardContent className="p-0">
          {/* Structure Image - Fill width */}
          <div className="bg-white border-b">
            <ChemicalStructureImage
              casNumber={casNumber}
              ingredientName={ingredientName}
              className="w-full min-h-[280px]"
            />
          </div>

          <div className="p-4 space-y-4">
            {/* Safety Badge - Expandable */}
            {data.ghsSignalWord && (
              <SafetyWarningSection
                signalWord={data.ghsSignalWord}
                hazardStatements={data.ghsHazardStatements || []}
              />
            )}

            {/* Drug-Likeness Profile */}
            {drugLikeness && (
              <div className="bg-muted/30 rounded-lg p-3 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-muted-foreground">
                    Bioavailability Profile
                  </span>
                  <Badge
                    variant={
                      drugLikeness.interpretation === "Excellent"
                        ? "default"
                        : drugLikeness.interpretation === "Good"
                          ? "secondary"
                          : drugLikeness.interpretation === "Moderate"
                            ? "outline"
                            : "destructive"
                    }
                    className="text-[10px] h-5"
                  >
                    {drugLikeness.interpretation}
                  </Badge>
                </div>
                <Progress value={drugLikeness.overallScore} className="h-1.5" />
                <div className="flex items-center gap-3 text-[10px] text-muted-foreground">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span className="flex items-center gap-1 cursor-help">
                        {drugLikeness.lipinskiScore === 4 ? (
                          <CheckCircle2 className="h-3 w-3 text-green-600" />
                        ) : drugLikeness.lipinskiScore >= 3 ? (
                          <AlertTriangle className="h-3 w-3 text-amber-500" />
                        ) : (
                          <XCircle className="h-3 w-3 text-red-500" />
                        )}
                        Lipinski {drugLikeness.lipinskiScore}/4
                      </span>
                    </TooltipTrigger>
                    <TooltipContent
                      side="bottom"
                      className="text-xs max-w-[200px]"
                    >
                      <p className="font-medium mb-1">Lipinski's Rule of 5</p>
                      {drugLikeness.lipinskiViolations.length === 0 ? (
                        <p className="text-green-600">All rules passed ✓</p>
                      ) : (
                        <ul className="text-red-600">
                          {drugLikeness.lipinskiViolations.map((v, i) => (
                            <li key={i}>• {v}</li>
                          ))}
                        </ul>
                      )}
                    </TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span className="flex items-center gap-1 cursor-help">
                        {drugLikeness.veberCompliant ? (
                          <CheckCircle2 className="h-3 w-3 text-green-600" />
                        ) : (
                          <XCircle className="h-3 w-3 text-red-500" />
                        )}
                        Veber {drugLikeness.veberCompliant ? "OK" : "Fail"}
                      </span>
                    </TooltipTrigger>
                    <TooltipContent side="bottom" className="text-xs">
                      <p className="font-medium mb-1">Veber's Rules</p>
                      <p>TPSA ≤140 Å², Rotatable bonds ≤10</p>
                      {data.tpsa !== undefined && (
                        <p>TPSA: {data.tpsa.toFixed(1)} Å²</p>
                      )}
                      {data.rotatableBondCount !== undefined && (
                        <p>Rot. bonds: {data.rotatableBondCount}</p>
                      )}
                    </TooltipContent>
                  </Tooltip>
                </div>
              </div>
            )}

            {/* Core Properties Grid */}
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide">
                  Formula
                </p>
                <p className="font-mono font-medium">
                  {data.molecularFormula || "—"}
                </p>
              </div>
              <div>
                <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide">
                  Weight
                </p>
                <p className="font-medium">
                  {data.molecularWeight
                    ? `${data.molecularWeight.toFixed(2)} g/mol`
                    : "—"}
                </p>
              </div>
              {data.xlogP !== undefined && (
                <div>
                  <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide">
                    Log P
                  </p>
                  <p className="font-medium">{data.xlogP.toFixed(2)}</p>
                </div>
              )}
              {data.tpsa !== undefined && (
                <div>
                  <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide">
                    TPSA
                  </p>
                  <p className="font-medium">{data.tpsa.toFixed(1)} Å²</p>
                </div>
              )}
            </div>

            {/* Extended Properties */}
            {(data.hBondDonorCount !== undefined ||
              data.hBondAcceptorCount !== undefined ||
              data.rotatableBondCount !== undefined) && (
              <>
                <Separator />
                <div className="grid grid-cols-3 gap-2 text-center">
                  {data.hBondDonorCount !== undefined && (
                    <div className="bg-muted/30 rounded p-2">
                      <p className="text-lg font-bold">
                        {data.hBondDonorCount}
                      </p>
                      <p className="text-[9px] text-muted-foreground">
                        H-Bond Donors
                      </p>
                    </div>
                  )}
                  {data.hBondAcceptorCount !== undefined && (
                    <div className="bg-muted/30 rounded p-2">
                      <p className="text-lg font-bold">
                        {data.hBondAcceptorCount}
                      </p>
                      <p className="text-[9px] text-muted-foreground">
                        H-Bond Acceptors
                      </p>
                    </div>
                  )}
                  {data.rotatableBondCount !== undefined && (
                    <div className="bg-muted/30 rounded p-2">
                      <p className="text-lg font-bold">
                        {data.rotatableBondCount}
                      </p>
                      <p className="text-[9px] text-muted-foreground">
                        Rotatable Bonds
                      </p>
                    </div>
                  )}
                </div>
              </>
            )}

            {/* Experimental Properties */}
            {(data.meltingPoint || data.solubility) && (
              <>
                <Separator />
                <div className="space-y-2">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1">
                    <FlaskConical className="h-3 w-3" /> Experimental
                  </p>
                  {data.meltingPoint && (
                    <div>
                      <p className="text-[10px] text-muted-foreground">
                        Melting Point
                      </p>
                      <p
                        className="text-xs line-clamp-1"
                        title={data.meltingPoint}
                      >
                        {data.meltingPoint}
                      </p>
                    </div>
                  )}
                  {data.solubility && (
                    <div>
                      <p className="text-[10px] text-muted-foreground">
                        Solubility
                      </p>
                      <p
                        className="text-xs line-clamp-2"
                        title={data.solubility}
                      >
                        {data.solubility}
                      </p>
                    </div>
                  )}
                </div>
              </>
            )}

            {/* Synonyms */}
            {data.synonyms && data.synonyms.length > 0 && (
              <>
                <Separator />
                <div className="space-y-1.5">
                  <p className="text-[10px] text-muted-foreground">
                    Also Known As
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {data.synonyms.map((s, i) => (
                      <Badge
                        key={i}
                        variant="outline"
                        className="text-[9px] px-1.5 py-0 h-4 font-normal"
                      >
                        {s}
                      </Badge>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </TooltipProvider>
  );
}
