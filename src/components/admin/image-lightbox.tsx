"use client";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface ImageLightboxProps {
  src: string;
  alt: string;
  /** Tailwind sizing classes for the thumbnail. */
  thumbClassName?: string;
}

export function ImageLightbox({
  src,
  alt,
  thumbClassName = "h-20 w-20",
}: ImageLightboxProps) {
  return (
    <Dialog>
      <DialogTrigger
        render={
          <button
            type="button"
            className={`group relative overflow-hidden rounded-md border border-border ${thumbClassName}`}
          />
        }
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          className="h-full w-full object-cover transition-transform group-hover:scale-105"
        />
        <span className="sr-only">Enlarge image</span>
      </DialogTrigger>
      <DialogContent className="max-w-[calc(100%-2rem)] p-2 sm:max-w-2xl">
        <DialogTitle className="sr-only">{alt}</DialogTitle>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          className="max-h-[80vh] w-full rounded-md object-contain"
        />
      </DialogContent>
    </Dialog>
  );
}
