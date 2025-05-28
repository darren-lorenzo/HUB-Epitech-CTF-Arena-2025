
export const ROLES = {
    ADMIN: {
        name: 'admin',
        description: 'Accès complet à toutes les fonctionnalités'
    },
    MANAGER: {
        name: 'manager',
        description: 'Création événements et gestion challenges'
    },
    DEV: {
        name: 'dev',
        description: 'Soumission de challenges aux admins - Participation aux challenges'
    },
    USER: {
        name: 'user',
        description: 'Participation aux challenges'
    }
};
  
export const PERMISSIONS = {

    CREATE_EVENT: [ROLES.ADMIN.name, ROLES.MANAGER.name],
    MANAGE_EVENTS: [ROLES.ADMIN.name, ROLES.MANAGER.name],

    SUBMIT_CHALLENGE_TO_ADMIN: [ROLES.DEV.name],
    REVIEW_CHALLENGES: [ROLES.ADMIN.name],
    PUBLISH_CHALLENGES: [ROLES.ADMIN.name, ROLES.MANAGER.name],

    SOLVE_CHALLENGES: [ROLES.ADMIN.name, ROLES.MANAGER.name, ROLES.DEV.name, ROLES.USER.name],
    VIEW_HIDDEN_CHALLENGES: [ROLES.ADMIN.name, ROLES.MANAGER.name]
};
