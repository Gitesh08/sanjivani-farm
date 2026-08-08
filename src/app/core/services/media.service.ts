import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MediaService {

  constructor() { }

  private getBaseUrl(): string {
    return environment.mediaBaseUrl;
  }

  /**
   * Returns the URL for a poster image.
   * @param path e.g., 'toy-train'
   */
  poster(path: string): string {
    return `${this.getBaseUrl()}/${path}/poster.webp`;
  }

  /**
   * Returns the URL for a thumbnail image.
   * @param path e.g., 'toy-train'
   */
  thumbnail(path: string): string {
    return `${this.getBaseUrl()}/${path}/thumbnail.webp`;
  }

  /**
   * Returns the URL for the HLS master playlist.
   * @param path e.g., 'toy-train'
   */
  masterPlaylist(path: string): string {
    return `${this.getBaseUrl()}/${path}/master.m3u8`;
  }

  /**
   * Returns the URL for the muted preview clip.
   * @param path e.g., 'toy-train'
   */
  preview(path: string): string {
    return `${this.getBaseUrl()}/${path}/preview.mp4`;
  }

  /**
   * Returns the URL for the MP4 fallback.
   * @param path e.g., 'toy-train'
   */
  fallbackMp4(path: string): string {
    return `${this.getBaseUrl()}/${path}/1080.mp4`;
  }

  /**
   * Helper to keep Cloudinary URLs intact if passed, else prepend mediaBaseUrl.
   * Just in case there are other images we haven't migrated yet.
   */
  resolveUrl(urlOrPath: string): string {
    if (urlOrPath.startsWith('http')) {
      return urlOrPath;
    }
    return `${this.getBaseUrl()}/${urlOrPath}`;
  }
}
