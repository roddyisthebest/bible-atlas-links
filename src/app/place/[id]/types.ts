export interface PlaceType {
  id: number;
  name: string;
}

export interface Place {
  id: string;
  name: string;
  anotherNames: string | null;
  anotherKoreanNames: string | null;
  koreanName: string;
  isModern: boolean;
  description: string;
  koreanDescription: string;
  imageTitle: string;
  stereo: string;
  verse: string | null;
  likeCount: number;
  unknownPlacePossibility: number | null;
  latitude: number;
  longitude: number;
  types: Array<{
    id: number;
    name: string;
  }>;
}

export interface ChildRelation {
  id: number;
  child: Place;
  possibility: number;
  place: Place;
}

export interface PlaceDetail extends Place {
  childRelations: ChildRelation[];
  parentRelations: unknown[];
}
