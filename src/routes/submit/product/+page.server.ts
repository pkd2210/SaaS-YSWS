import { redirect } from '@sveltejs/kit';
export const load = async ({ parent, url }) => {
    const data = await parent();
    if (!data.user) {
        throw redirect(303, '/api/login');
    }
    // Get users project from https://hackatime.hackclub.com/api/v1/users/SLACKID/stats?features=projects&start_date=2026-01-01
    const response = await fetch(`https://hackatime.hackclub.com/api/v1/users/${data.user.slack_id}/stats?features=projects&start_date=2026-01-01`);
    const projectsData = await response.json();
    
    // Check if the response has projects and if it's an array
    if (!projectsData || !projectsData.data || !projectsData.data.projects || !Array.isArray(projectsData.data.projects)) {
        return {
            user: data.user,
            projectListByName: {}
        };
    }
    
    if (projectsData.data.projects.length === 0) {
        throw redirect(303, '/submit');
    }
    let projectListByName: Record<string, any> = {};
    projectsData.data.projects.forEach((project) => {
        projectListByName[project.name] = project;
    });
    return {
        user: data.user,
        projectListByName: projectListByName
    };
}