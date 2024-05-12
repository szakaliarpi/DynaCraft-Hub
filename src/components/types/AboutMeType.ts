export type AboutMeType = {
    id: string;
    educations: Course[];
    experiences: Experience[];
    facts: string;
    introduction: string;
    languages: Language;
    skills: Skill[];
    softSkills: string;
    title: string;
    tools: Tools;
};

type Course = {
    course: string;
    institution: string;
    location: string;
    year: string;
};

type Experience = {
    duration: string;
    firm: string;
    role: string[];
};

type Language = {
    language: string[];
    level: string[];
};

type Skill = {
    description: string;
    title: string;
};

type Tools = {
    level: string[];
    name: string[];
};


