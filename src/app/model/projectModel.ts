export interface Project{
    name_project:string;
    company: {
    id_company: number;
}
}

export interface ProjectResponse{
    id_project:number;
    name_project:string;
    company: {
    id_company: number;
}
}