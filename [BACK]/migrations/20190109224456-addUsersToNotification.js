module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addColumn(
            'Notifications', // name of Source model
            'UserId', // name of the key we're adding
            {
                type: Sequelize.INTEGER,
                references: {
                    model: "Users", // name of Target model
                    key: 'id', // key in Target model that we're referencing
                },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL',
            }
        ).then(() => {
            return queryInterface.addColumn(
                'Notifications', // name of Source model
                'SenderId', // name of the key we're adding
                {
                    type: Sequelize.INTEGER,
                    references: {
                        model: "Users", // name of Target model
                        key: 'id', // key in Target model that we're referencing
                    },
                    onUpdate: 'CASCADE',
                    onDelete: 'SET NULL',
                }
            )
        });
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.removeColumn('Notifications', 'UserID').then(() => queryInterface.removeColumn('Notifications', 'SenderId')
        );
    }
};