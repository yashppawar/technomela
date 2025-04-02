declare module 'multer' {
  import { Request } from 'express';
  
  namespace multer {
    interface File {
      fieldname: string;
      originalname: string;
      encoding: string;
      mimetype: string;
      size: number;
      destination: string;
      filename: string;
      path: string;
      buffer: Buffer;
    }
    
    interface FileFilterCallback {
      (error: Error | null, acceptFile: boolean): void;
    }
  }
  
  interface MulterOptions {
    dest?: string;
    storage?: any;
    limits?: {
      fieldNameSize?: number;
      fieldSize?: number;
      fields?: number;
      fileSize?: number;
      files?: number;
      parts?: number;
      headerPairs?: number;
    };
    preservePath?: boolean;
    fileFilter?(
      req: Request,
      file: Express.Multer.File,
      callback: multer.FileFilterCallback
    ): void;
  }
  
  interface Multer {
    single(fieldname: string): any;
    array(fieldname: string, maxCount?: number): any;
    fields(fields: Array<{ name: string; maxCount?: number }>): any;
    none(): any;
  }
  
  function multer(options?: MulterOptions): Multer;
  
  export = multer;
}

declare module 'fs-extra' {
  export * from 'fs';
  
  export function ensureDirSync(path: string): void;
  export function ensureDir(path: string): Promise<void>;
  export function ensureFile(path: string): Promise<void>;
  export function ensureFileSync(path: string): void;
  export function ensureLink(src: string, dest: string): Promise<void>;
  export function ensureLinkSync(src: string, dest: string): void;
  export function ensureSymlink(src: string, dest: string, type?: string): Promise<void>;
  export function ensureSymlinkSync(src: string, dest: string, type?: string): void;
  export function remove(path: string): Promise<void>;
  export function removeSync(path: string): void;
  export function emptyDir(path: string): Promise<void>;
  export function emptyDirSync(path: string): void;
  
  // Add more functions as needed
} 