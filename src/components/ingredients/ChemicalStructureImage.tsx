"use client";

import { useEffect, useState, useRef } from "react";
import { Loader2 } from "lucide-react";

interface ChemicalStructureImageProps {
  casNumber: string;
  ingredientName: string;
  className?: string;
}

export function ChemicalStructureImage({
  casNumber,
  ingredientName,
  className = "",
}: ChemicalStructureImageProps) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    setImageLoaded(false);

    if (!casNumber) {
      setIsLoading(false);
      return;
    }

    async function fetchStructureImage() {
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

        if (!cid) {
          throw new Error(`Compound not found in PubChem`);
        }

        // Use PNG endpoint with maximum size (500x500) for best quality
        const structureUrl = `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/${cid}/PNG?image_size=500x500`;

        if (mountedRef.current) {
          setImageUrl(structureUrl);
          setIsLoading(false);
        }
      } catch (err) {
        if (mountedRef.current) {
          setError(
            err instanceof Error ? err.message : "Failed to fetch structure",
          );
          setIsLoading(false);
        }
      }
    }

    fetchStructureImage();

    return () => {
      mountedRef.current = false;
    };
  }, [casNumber, ingredientName]);

  if (!casNumber) {
    return null;
  }

  if (isLoading) {
    return (
      <div
        className={`flex items-center justify-center ${className}`}
        style={{ minHeight: "120px" }}
      >
        <Loader2 className="h-5 w-5 animate-spin text-muted-foreground/40" />
      </div>
    );
  }

  if (error || !imageUrl) {
    return null;
  }

  return (
    <div className={`flex items-center justify-center relative ${className}`}>
      {!imageLoaded && (
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground/40 absolute" />
      )}
      <img
        src={imageUrl}
        alt={`Chemical structure of ${ingredientName}`}
        className={`w-full h-full object-contain p-4 transition-opacity duration-200 ${imageLoaded ? "opacity-100" : "opacity-0"}`}
        style={{ maxHeight: "100%" }}
        onLoad={() => setImageLoaded(true)}
        onError={() => setError("Failed to load image")}
      />
    </div>
  );
}
