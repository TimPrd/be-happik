module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addColumn(
            'Teams', // name of Source model
            'ManagerId', // name of the key we're adding
            {
                type: Sequelize.INTEGER,
                references: {
                    model: "Users", // name of Target model
                    key: 'id', // key in Target model that we're referencing
                },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL',
            }
        );
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.removeColumn(
            'Team', // name of Source model
            'ManagerId' // key we want to remove
        );
    }
};
