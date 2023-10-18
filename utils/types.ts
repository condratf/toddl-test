export type BreedName = string;
export type SubBreedName = string;
export type BreedImage = string;
export type SubBreedImage = string;

export type BreedList = {
  [k: BreedName]: Array<SubBreed>
}
export type SubBreedsList = Array<SubBreedName>

export type BreedImageList = Array<BreedImage | SubBreedImage>

export enum StatusVariant {
  success = "success",
  failure = "failure",
}

export type BreedResponse<T extends (BreedList | BreedImageList | BreedImage | SubBreedsList)> = {
  message: T,
  status: StatusVariant
}