
const Roles = [ {
        role: { id: "ADMIN", name: 'Role Administrateur'},
        permissions : [
            // { id: 'me_as_member', name: 's\'enregister en tant que membre'},
        ]
    },
    {
        role: {id : "USER", name: 'Role Utilisateur'},
        permissions: [
            // { id: 'me_as_member', name: 's\'enregistrer en tant que membre'},
            // { id: 't
        ]
    },
    {
        role: {id : "DEV", name: 'Développeur'},
        permissions: [
            // { id: 'me_as_member', name: 's\'enregistrer en tant que membre'},
        ]
    },
    {
        role: {id : "MANAGER", name: 'Manager de la plateforme'},
        permissions: [
            // { id: 'tree', name: 'consulter l\'abre généalogique'},

        ]
    }
];

module.exports = Roles;