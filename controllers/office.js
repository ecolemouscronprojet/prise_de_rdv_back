const { v4: uuidv4 } = require('uuid');

//MOCK
const data = [
    {
        id: 'b1ab14b4-6514-4de5-a265-209a4f4133df',
        name: 'Bureau 1',
    },
    {
        id: 'f4a03ea5-2eb2-48a9-9aaa-d896bfb12b32',
        name: 'Bureau 2',
    }
];

const getAll = (req, res) => {
    res.json(data);
}

const get = (req, res) => {
    const { id }  = req.params;
    const office = data.find(o => {
        return o.id === id
    });

    if(office === undefined) {
        return res.status(404).json({error: 'Record not found'});   
    }

    res.json(office);
}

const add = (req, res) => {
    const { name } = req.body;
    if(name == null) {
        return res.status(400).json({error: 'Missing parameter'});
    }

    const office = {
        id: uuidv4(),
        name
    };

    data.push(office);

    res.json(office);
}


const remove = (req, res) => {
    const { id } = req.params;
    const officeIndex = data.findIndex(o => o.id == id);
    if (officeIndex === -1) {
        return res.status(404).json({error: 'Record not found !'});
    }

    data.splice(officeIndex, 1);

    return res.status(204).send();
}

const edit = (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    if(name == null) {
        return res.status(400).json({error: 'Missing parameter'});
    }
    const office = data.find(o => o.id === id);
    if (office === undefined) {
        return res.status(404).json({error: 'Record not found !'});
    }

    office.name = name;

    return res.json(office);
}



module.exports = {
    getAll,
    get,
    add,
    remove,
    edit,
    officeData: data
}