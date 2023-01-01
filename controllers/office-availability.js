const { v4: uuidv4 } = require('uuid');
const { dateIsValid } = require('../tools');
const { officeData } = require('./office');

const repeatStatusENUM =  {
    onceAWeek: 'onceAWeek',
    everyDay: 'everyDay',
};


// MOCKsss
const data = [
    {
        id: '2250d556-225a-4412-91d2-13b14224d0d8',
        officeId: 'b1ab14b4-6514-4de5-a265-209a4f4133df',
        startDate: new Date('2023-01-01T09:30:00'),
        endDate: new Date('2023-01-01T12:30:00'),
        slotDuration: 10, // minitue
        repeatStatus: repeatStatusENUM.onceAWeek,
        repeatStatusEndDate: new Date('2023-01-31T12:30:00'),
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


// vérfier que les office availability ne se chevauchent pas !

const add = (req, res) => {
    const {   
        officeId,
        startDate,
        endDate,
        slotDuration,
        repeatStatus,
        repeatStatusEndDate
     } = req.body;
  

    if (
        officeId == null ||
        startDate == null ||
        endDate == null ||
        slotDuration == null 
        ) {
        return res.status(400).json({error: 'Missing parameter'});
    }


    if(!officeData.some(o => o.id === officeId)) {
        return res.status(400).json({error: 'Unknown office !'});
    }

    const _startDate  = new Date(startDate);
    const _endDate  = new Date(endDate);


    if (!dateIsValid(_startDate) || !dateIsValid(_endDate)) {
        return res.status(400).json({error: 'Invalid date'});
    }
    
    if (_startDate.getTime() >= _endDate.getTime()) {
        return res.status(400).json({error: 'The first date should be after the end date'});
    }

    const office = {
        id: uuidv4(),
        officeId,
        startDate,
        endDate,
        slotDuration,
    };

    if(repeatStatus != null && !repeatStatusENUM[repeatStatus]) {
        return res.status(400).json({error: 'Unknown repeat status'});
    }

    const _repeatStatusEndDate = new Date(repeatStatusEndDate);

    if (repeatStatus != null && !dateIsValid(_repeatStatusEndDate)) {
        return res.status(400).json({error: 'The repeat status end date is required !'});
    }
    

    office.repeatStatus = repeatStatus;
    office.repeatStatusEndDate = repeatStatusEndDate;

    data.push(office);

    res.json(office);
}

const remove = (req, res) => {
    const { id } = req.params;
    const officeAvailability = data.findIndex(o => o.id == id);
    if (officeAvailability === -1) {
        return res.status(404).json({error: 'Record not found !'});
    }

    data.splice(officeAvailability, 1);

    return res.status(204).send();
}





const edit = (req, res) => {
    const { id } = req.params;
    const {   
        startDate,
        endDate,
        slotDuration,
        repeatStatus,
        repeatStatusEndDate
     } = req.body;
  

     const office = data.find(o => o.id === id);
    
     if (office === undefined) {
         return res.status(404).json({error: 'Record not found !'});
     }

    if (
        startDate == null ||
        endDate == null ||
        slotDuration == null 
        ) {
        return res.status(400).json({error: 'Missing parameter'});
    }
    
    const _startDate  = new Date(startDate);
    const _endDate  = new Date(endDate);

    if (!dateIsValid(_startDate) || !dateIsValid(_endDate)) {
        return res.status(400).json({error: 'Invalid date'});
    }
    
    if (_startDate.getTime() >= _endDate.getTime()) {
        return res.status(400).json({error: 'The first date should be after the end date'});
    }

    office.startDate = startDate;
    office.endDate = endDate;
    office.slotDuration = slotDuration;

    if(repeatStatus != null && !repeatStatusENUM[repeatStatus]) {
        return res.status(400).json({error: 'Unknown repeat status'});
    }

    const _repeatStatusEndDate = new Date(repeatStatusEndDate);

    if (repeatStatus != null && !dateIsValid(_repeatStatusEndDate)) {
        return res.status(400).json({error: 'The repeat status end date is required !'});
    }
    

    office.repeatStatus = repeatStatus;
    office.repeatStatusEndDate = repeatStatusEndDate;

    return res.json(office);
}

module.exports = {
    getAll,
    get,
    add,
    remove,
    edit,
}