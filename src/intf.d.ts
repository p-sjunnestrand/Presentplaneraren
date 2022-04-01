interface IList {
    title: string,
    _id: string,
    items: IItem[], 
}

interface IGroup {
    _id: string,
    name: string,
    users: string[]
}

interface IItem {
    _id?: string,
    name: string,
    desc: string,
    url: string,
    store: string
}