// Este archivo centralizará la lógica para traducir los roles.

/**
 * Traduce un identificador de rol a su texto correspondiente en español.
 * @param {string} role - El rol en inglés (ej: 'Administrator', 'team member').
 * @returns {string} - El rol traducido en español.
 */
export const translateRole = (role) => {
    // Se usa .trim() para eliminar posibles espacios en blanco al inicio o al final.
    const cleanRole = typeof role === 'string' ? role.trim() : role;

    const roleMap = {
        'Administrator': 'Admin',
        'Admin': 'Admin',
        'team member': 'Miembro',
        'viewer': 'Visualizador'
    };

    // Devuelve la traducción si existe, o el rol original si no se encuentra.
    return roleMap[cleanRole] || cleanRole;
};