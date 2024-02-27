import { atom } from 'recoil';

export type ExperienceType = 'Personal' | 'Profesional'[];

export type ExperienceState = {
  id: number; // this id will correlate to the generalExperience
  experienceType: ExperienceType[];
  mainExperienceAreas: string[];
  otherExperienceAreas: string[];
}[];

export const generalExperienceState = atom<number[]>({
  key: 'generalExperienceState',
  default: [],
});

export const experienceTypeState = atom<string[]>({
  key: 'experienceTypeState',
  default: [],
});

export const mainExperienceAreasState = atom<string[]>({
  key: 'mainExperienceAreasState',
  default: [],
});

export const otherExperienceAreasState = atom<string[]>({
  key: 'otherExperienceAreasState',
  default: [],
});

export const aggregatedExperienceState = atom<ExperienceState>({
  key: 'aggregatedExperienceState',
  default: [],
});
