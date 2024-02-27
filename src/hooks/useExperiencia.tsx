import { aggregatedExperienceState, ExperienceType } from '@/store/construirPerfil/experiencia';
import { useRecoilState } from 'recoil';

export const useExperiencia = () => {
  const [aggregatedExperience, setAggregatedExperience] = useRecoilState(aggregatedExperienceState);

  const selectPreviousExperience = (id: number) => {
    setAggregatedExperience((prev) => {
      const experience = prev.find((exp) => exp.id === id);
      if (experience) {
        return prev.filter((e) => e.id !== id);
      } else {
        return [
          ...prev,
          {
            id,
            experienceType: [],
            mainExperienceAreas: [],
            otherExperienceAreas: [],
          },
        ];
      }
    });
  };

  const detectPreviousExperience = (id: number) => {
    return Boolean(aggregatedExperience?.find((e) => e.id === id));
  };

  const selectExperienceType = (type: ExperienceType, id: number) => {
    const experience = aggregatedExperience.find((exp) => exp.id === id);
    if (experience) {
      setAggregatedExperience((prev) => {
        return prev.map((exp) => {
          if (exp.id === id) {
            return {
              ...exp,
              experienceType: exp.experienceType.includes(type)
                ? exp.experienceType.filter((item) => item !== type)
                : [...exp.experienceType, type],
              mainExperienceAreas: [...exp.mainExperienceAreas],
              otherExperienceAreas: [...exp.otherExperienceAreas],
            };
          }
          return exp;
        });
      });
    }
  };

  const detectSelectedExperienceType = (type: ExperienceType, id: number) => {
    return Boolean(aggregatedExperience?.find((e) => e.id === id)?.experienceType.includes(type));
  };

  const selectMainExperienceAreas = (label: string, id: number) => {
    setAggregatedExperience((prev) => {
      return prev.map((exp) => {
        if (exp.id === id) {
          return {
            ...exp,
            experienceType: [...exp.experienceType],
            mainExperienceAreas: exp.mainExperienceAreas.includes(label)
              ? exp.mainExperienceAreas.filter((item) => item !== label)
              : exp.mainExperienceAreas.length >= 3
              ? [...exp.mainExperienceAreas.slice(1), label]
              : [...exp.mainExperienceAreas, label],
            otherExperienceAreas: exp.otherExperienceAreas.includes(label)
              ? exp.otherExperienceAreas.filter((l) => l !== label)
              : [...exp.otherExperienceAreas, label],
          };
        }
        return exp;
      });
    });
  };

  const detectMainExperienceAreas = (label: string, id: number) => {
    return Boolean(
      aggregatedExperience?.find((e) => e.id === id)?.mainExperienceAreas.includes(label),
    );
  };

  const detectOtherExperienceAreas = (label: string, id: number) => {
    return Boolean(
      aggregatedExperience?.find((e) => e.id === id)?.otherExperienceAreas.includes(label),
    );
  };

  const selectOtherExperienceAreas = (label: string, id: number) => {
    setAggregatedExperience((prev) => {
      return prev.map((exp) => {
        if (exp.id === id) {
          return {
            ...exp,
            experienceType: [...exp.experienceType],
            mainExperienceAreas: [...exp.mainExperienceAreas],
            otherExperienceAreas: exp.otherExperienceAreas.includes(label)
              ? exp.otherExperienceAreas.filter((item) => item !== label)
              : [...exp.otherExperienceAreas, label],
          };
        }
        return exp;
      });
    });
  };

  return {
    aggregatedExperience,
    selectPreviousExperience,
    detectPreviousExperience,
    selectExperienceType,
    detectSelectedExperienceType,
    selectMainExperienceAreas,
    detectMainExperienceAreas,
    detectOtherExperienceAreas,
    selectOtherExperienceAreas,
  };
};
