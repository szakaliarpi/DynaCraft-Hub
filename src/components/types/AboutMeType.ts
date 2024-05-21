import {LanguageType} from "@/components/types/LanguageType";
import {EducationType} from "@/components/types/EducationType";
import {ExperienceType} from "@/components/types/ExperienceType";
import {SkillType} from "@/components/types/SkillType";
import {ToolType} from "@/components/types/ToolType";

export type AboutMeType = {
    id: string;
    education: EducationType[];
    experience: ExperienceType[];
    fact: string;
    introduction: string;
    languages: LanguageType[];
    name: string;
    skill: SkillType[];
    soft_skill: string;
    title: string;
    tool: ToolType[];
    timestamp: number;
};


