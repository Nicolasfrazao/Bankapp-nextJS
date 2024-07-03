import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import qs from 'query-string';
import { z } from "zod";


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
