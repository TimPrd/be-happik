module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addColumn(
            'Users', // name of Source model
            'TeamId', // name of the key we're adding
            {
                type: Sequelize.INTEGER,
                references: {
                    model: "Teams", // name of Target model
                    key: 'id', // key in Target model that we're referencing
                },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL',
            }
        );
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.removeColumn(
            'Users', // name of Source model
            'teamID' // key we want to remove
        );
    }
};