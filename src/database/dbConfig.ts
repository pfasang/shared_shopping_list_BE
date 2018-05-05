export default {
    dbOwner: 'sslistDevUser',

    tables: {
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
