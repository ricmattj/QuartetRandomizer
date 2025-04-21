var dataAccess = require('./dataAccess');

const basses_master = [
    'Andy Richards',
    'David Speidel',
    'Jeff Bemis',
    'Martin Wissenberg',
    'Stanley Kleja',
    'Robert Preece',
    'Ben Wanggaard',
    'Keith Troxler',
    'Charles Buch-Hammonds',
    'Peter Bennett',
    'Jim Moris',
    'Steve Zorn',
    'David Casperson',
]

const leads_master = [
    'Heath Mueller',
    'Joseph Larson',
    'Shawn Hunter',
    'Harly Lentz',
    'Ben Brekke',
    'Alan Parker',
    'Paul Roberts',
    'Ed Obermeyer-Kolb',
    'Mark Wegner',
    'Rob Hoversten',
    'John White',
    'Wendell Keith',
    'Oliver Nicholson',
    'Tony Mason',
    'Conrad Ward',
    'Andy Ries',
    'Tony Lapakko'
]

const baris_master = [
    'Matt Richards',
    'Nathan Wilbur',
    'Anthony Koenig',
    'TJ Striblen',
    'Kirk Benson',
    'Scott Zoellner',
    'Merlin Friesen',
    'David Lapakko',
    'Mike Olson',
    'JT Hernson',
    'Mark Bloomquist',
    'Chad Knipfer'
];

const tenors_master = [
    'Randy Rogers',
    'Ken Wentworth',
    'Barry Hu',
    'Ben Miller',
    'Alan Coombs',
    'Niel Johnson',
    'Dave Bechard',
    'Jeff Schulz',
    'Steve Grady',
    'Norm Running'
];

const songs_master = [
   "Ain't That a Kick in the Head",
   "Everyone's Wrong But Me",
   "May I Never Love Again",
   "Just One Of Those Things",
   "I Can't Believe That You're In Love With Me",
   "Kalamazoo",
   "Roses of Picardy",
   "Good News",
   "Fun and Fancy Free",
   "Burnin' the Roadhouse Down" 
];

const quartetCount = Math.max(
    basses_master.length,
    baris_master.length,
    leads_master.length,
    tenors_master.length
);

console.log(`Total Quartets: ${quartetCount}`);

let basses = [...basses_master];
let baris = [...baris_master];
let leads = [...leads_master];
let tenors = [...tenors_master];
let songs = [...songs_master];

let quartets = [];

function randomize() {
    for (let i = 0; i < quartetCount; i++) {
        const bass = getRandomElement(basses, basses_master);
        basses = bass.newList;
        const bari = getRandomElement(baris, baris_master);
        baris = bari.newList;
        const lead = getRandomElement(leads, leads_master);
        leads = lead.newList;
        const tenor = getRandomElement(tenors, tenors_master);
        tenors = tenor.newList;
        const song = getRandomElement(songs, songs_master);
        songs = song.newList;

        quartets.push({
            quartet: i + 1,
            bass: bass.element,
            bari: bari.element,
            lead: lead.element,
            tenor: tenor.element,
            song: song.element,
        });
    }

    return quartets;
}

function getRandomElement(elements, master_elements) {
    if (elements.length === 1) {
        return {
            element: elements[0],
            newList: [...master_elements],
        };
    } else {
        const chosenElement =
            elements[Math.round(Math.random() * (elements.length - 1))];
        return {
            element: chosenElement,
            newList: elements.filter((e) => e != chosenElement),
        };
    }
}

var express = require('express')
var app = express()

app.set('port', (process.env.PORT || 9000));

app.get('/counts', (req, res) => {
    res.send({
        basses: basses_master.length,
        leads: leads_master.length,
        baris: baris_master.length,
        tenors: tenors_master.length
    })
});

app.get('/basses', (req, res) => {
    res.send(basses_master);
});

app.get('/bassesRandom', (req, res) => {
    res.send(getRandomElement(basses_master, basses_master).element);
});

app.get("/leads", (req, res) => {
    res.send(leads_master);
})

app.get('/leadsRandom', (req, res) => {
    res.send(getRandomElement(leads_master, leads_master).element);
});

app.get('/baris', (req, res) => {
    res.send(baris_master);
})

app.get('/barisRandom', (req, res) => {
    res.send(getRandomElement(baris_master, baris_master).element);
});

app.get('/tenors', (req, res) => {
    res.send(tenors_master);
})

app.get('/tenorsRandom', (req, res) => {
    res.send(getRandomElement(tenors_master, tenors_master).element);
});

app.get('/songsRandom', (req, res) => {
    res.send(getRandomElement(songs_master, songs_master).element);
});

app.get('/getRandomQuartets', function (req, res) {
    res.send(randomize());
});

app.get('/getSingleRandomQuartet', function (req, res) {
    let quartet = {
        bass: getRandomElement(basses_master, basses_master).element,
        lead: getRandomElement(leads_master, leads_master).element,
        bari: getRandomElement(baris_master, baris_master).element,
        tenor: getRandomElement(tenors_master, tenors_master).element,
        song: getRandomElement(songs_master, songs_master).element + '<br>' + getRandomElement(songs_master, songs_master).element
    };

    res.send(quartet);
});

app.use(express.static('public'));

app.listen(app.get('port'), function () {
    console.log('Node app is running on port', app.get('port'));
});