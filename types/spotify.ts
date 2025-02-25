export interface TrackResponse {
  href: string;
  items: Track[];
  limit: number;
  next: string | null;
  offset: number;
  previous: string | null;
  total: number;
}

interface ExternalUrls {
  spotify: string;
}

interface ImageObject {
  height: number;
  url: string;
  width: number;
}

interface Restriction {
  reason: string;
}

interface SimplifiedArtistObject {
  external_urls: ExternalUrls;
  href: string;
  id: string;
  name: string;
  type: string;
  uri: string;
}

interface Album {
  album_type: "album" | "single" | "compilation";
  total_tracks: number;
  available_markets: string[];
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: ImageObject[];
  name: string;
  release_date: string;
  release_date_precision: "year" | "month" | "day";
  restrictions?: Restriction;
  type: "album";
  uri: string;
  artists: SimplifiedArtistObject[];
}

interface ExternalIds {
  isrc?: string;
  ean?: string;
  upc?: string;
}

interface LinkedFrom {
  // Define the properties of the linked_from object if needed
}

export interface Track {
  album: Album;
  artists: SimplifiedArtistObject[];
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_ids: ExternalIds;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  is_playable?: boolean;
  linked_from?: LinkedFrom;
  name: string;
  popularity: number;
  preview_url: string | null;
  track_number: number;
  type: "track";
  uri: string;
  is_local: boolean;
  restrictions?: Restriction;
}