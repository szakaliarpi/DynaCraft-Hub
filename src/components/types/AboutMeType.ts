export type AboutMeType = {
    id: string;
    education: Education[];
    experience: Experience[];
    fact: string;
    introduction: string;
    language: Language;
    name: string;
    skill: Skill[];
    soft_skill: string;
    title: string;
    tool: Tools;
    timestamp: number;
};

type Education = {
    course: string;
    institution: string;
    location: string;
    year: string;
};

type Experience = {
    duration: string;
    firm: string;
    role: string;
};

type Language = {
    language: string[];
    level: number[];
};

type Skill = {
    description: string;
    title: string;
};

type Tools = {
    level: number[];
    name: string[];
};


