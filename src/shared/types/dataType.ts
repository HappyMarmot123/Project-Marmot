import type { Session, User, UserMetadata } from "@supabase/supabase-js";
import { LucideProps } from "lucide-react";
import type { RefObject, MouseEvent, ReactNode } from "react";

export interface SpotifyTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}

export interface SpotifyError {
  error: {
    status: number;
    message: string;
  };
}

export interface PagingObject<T> {
  href: string;
  items: T[];
  limit: number;
  next: string | null;
  offset: number;
  previous: string | null;
  total: number;
}

export interface SearchResponse {
  tracks: PagingObject<TrackObjectFull>;
  // Include other types like albums, artists if needed
}

export interface SpotifyTokenResponse {
  accessToken: string;
  expiresIn: number;
}

export interface ExternalUrls {
  spotify: string;
}

export interface ImageObject {
  url: string;
  height: number | null;
  width: number | null;
}

export interface ArtistObjectSimplified {
  external_urls: ExternalUrls;
  href: string;
  id: string;
  name: string;
  type: "artist";
  uri: string;
}

export interface AlbumObjectSimplified {
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
  type: "album";
  uri: string;
  artists: ArtistObjectSimplified[];
}

export interface TrackObjectFull {
  album: AlbumObjectSimplified;
  artists: ArtistObjectSimplified[];
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_ids: { isrc?: string; ean?: string; upc?: string };
  external_urls: ExternalUrls;
  href: string;
  id: string;
  is_playable?: boolean;
  name: string;
  popularity: number;
  preview_url: string | null;
  track_number: number;
  type: "track";
  uri: string;
  is_local: boolean;
}

export interface AlbumTrackItem {
  artists: ArtistObjectSimplified[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  is_playable: boolean;
  name: string;
  preview_url: string | null;
  track_number: number;
  type: "track";
  uri: string;
  is_local: boolean;
}

export interface AlbumTracks {
  href: string;
  limit: number;
  next: string | null;
  offset: number;
  previous: string | null;
  total: number;
  items: AlbumTrackItem[];
}

export interface Copyright {
  text: string;
  type: string;
}

export interface PlayerTrackDetailsProps {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  currentProgress: number;
  seekBarContainerRef: RefObject<HTMLDivElement | null>;
  seek: (time: number) => void;
}

export interface AlbumArtworkProps {
  isPlaying: boolean;
  isBuffering: boolean;
  currentTrackInfo: TrackInfo;
}

export interface PlayerControlsSectionProps {
  currentTrackInfo: TrackInfo;
}

export interface TrackInfo {
  assetId: string;
  album: string;
  name: string;
  artworkId: string;
  url: string;
  producer: string;
}

export interface CloudinaryResource {
  asset_id: string;
  created_at: string;
  status: string;
  public_id: string;
  type: string;
  resource_type: string;
  asset_folder: string;
  secure_url: string;
  context: {
    alt: string;
    caption: string;
  };
  // 가공된 추가 필드
  title: string;
  producer: string;
  album_secure_url: string;
}

export interface likeType {
  asset_id: string;
  isLike: boolean;
}

export interface ModalMusicListProps {
  loading: boolean | null;
  trackList: CloudinaryResource[];
  isLiked: likeType[];
  toggleLike: (assetId: string) => void;
  onTrackSelect?: (assetId: string) => void;
}

export interface CustomUserMetadata extends UserMetadata {
  uid: string;
  avatar_url: string;
  email: string;
  full_name: string;
}

export interface AudioVisualizerProps {
  analyserNode: AnalyserNode | null;
  isPlaying: boolean;
  width?: number;
  height?: number;
}

export interface EarthProps {
  width?: number;
  height?: number;
  className?: string;
  baseColor?: [number, number, number];
  markerColor?: [number, number, number];
  glowColor?: [number, number, number];
}

export interface AudioPlayerState {
  currentTrack: TrackInfo;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  isBuffering: boolean;
  volume: number; // 0 to 1
  isMuted: boolean;

  // Actions
  setTrack: (track: TrackInfo, playImmediately?: boolean) => void;
  togglePlayPause: () => void;
  setIsPlaying: (playing: boolean) => void;
  setCurrentTime: (time: number) => void;
  setDuration: (duration: number) => void;
  setIsBuffering: (buffering: boolean) => void;
  setVolume: (volume: number) => void;
  toggleMute: () => void;
  seekTo: (time: number) => void;
}

export interface zustandPersistSet {
  (
    partial:
      | AudioPlayerState
      | Partial<AudioPlayerState>
      | ((
          state: AudioPlayerState
        ) => AudioPlayerState | Partial<AudioPlayerState>),
    replace?: false
  ): void;
  (
    state: AudioPlayerState | ((state: AudioPlayerState) => AudioPlayerState),
    replace: true
  ): void;
  (arg0: any): any;
}

export type TogglePlayPauseLogicParams = {
  audioContext: AudioContext | null;
  storeTogglePlayPause: () => void;
};

export type SeekLogicParams = {
  audio: HTMLAudioElement | null;
  currentTrack: TrackInfo;
  duration: number | null;
  time: number;
  storeSeekTo: (time: number) => void;
  isSeekingRef: React.MutableRefObject<boolean>;
};

export type PlayNextTrackLogicParams = {
  cloudinaryData: CloudinaryResource[];
  currentTrack: TrackInfo;
  setTrack: (track: TrackInfo, playImmediately: boolean) => void;
  isPlaying: boolean;
};

export type PlayPrevTrackLogicParams = {
  cloudinaryData: CloudinaryResource[];
  currentTrack: TrackInfo;
  setTrack: (track: TrackInfo, playImmediately: boolean) => void;
  isPlaying: boolean;
};

export interface CloudinaryStoreState {
  cloudinaryData: CloudinaryResource[];
  cloudinaryError: Error | null;
  isLoadingCloudinary: boolean;
  setCloudinaryData: (data: CloudinaryResource[]) => void;
  setCloudinaryError: (error: Error | null) => void;
  setIsLoadingCloudinary: (isLoading: boolean) => void;
}

export interface AudioStoreActions {
  storeSetCurrentTime: (time: number) => void;
  storeSetDuration: (duration: number) => void;
  storeSetIsBuffering: (isBuffering: boolean) => void;
  setTrack: (track: TrackInfo, playImmediately?: boolean) => void;
}

export type AuthProviderProps = {
  children: ReactNode;
};

export interface AuthStrategy {
  signIn(options?: any): Promise<void>;
}

export type AuthContextType = {
  session: Session | null;
  user: User | null;
  isLoadingSession: boolean;
  setSession: (session: Session | null) => void;
  authActions: {
    isLoading: boolean;
    signIn: (strategy: AuthStrategy) => Promise<void>;
    signOut: () => Promise<void>;
    GoogleAuthStrategy: AuthStrategy;
    KakaoAuthStrategy: AuthStrategy;
  };
};

export interface IconToggleButtonProps {
  id: string;
  condition: boolean;
  IconOnTrue: React.ComponentType<LucideProps>;
  IconOnFalse: React.ComponentType<LucideProps>;
  onClick: () => void;
  label: string;
  iconProps?: Omit<LucideProps, "ref">;
}
