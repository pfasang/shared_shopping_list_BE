export default {
    dbOwner: 'sslistDevUser',

    tables: {
        user: {
            name: 'users',
            params: {
                id: 'id',
                name: "name",
                email: "email",
                password: 'password',
            }
        },
        list: {
            name: "lists",
            params: {
                id: "id",
                title: "title",
                owner_id: "owner_id",
            }
        },
        item: {
            name: "items",
            params: {
                id: "id",
                name: "name",
                count: "count",
                unit: "unit",
                isBought: "isBought",
                list_id: "list_id",
            }
        },
    },

    timestamps: {
        created: 'createdAt',
        modified: 'modifiedAt'
    },
}
