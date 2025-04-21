var dataAccess = require('./dataAccess');

const basses = [
    'Peter Bennett',
	'David Casperson',
    'Ralph Cobb',
	'Jerald Forbes',
	'Stan Kleja',
    'Jim Moris',
	'Bob Preece',
	'Andrew Richards',
	'Duane Scott',
    'Smyte Smithlin',
	'David Speidel',
	'Ben Wanggaard',
	'Steve Zorn',
    'Mike Stehlik'
] 

const leads = [
    'Benjamin Brekke',
    'Nic Cols',
	'Robert Hoversten',
	'Wendell Keith',
    'Carl Johnson',
	'Tony Lapakko',
	'Joe Larson',
    'Peter Milan',
	'Heath Mueller',
	'Alan Parker',
	'Paul Roberts',
	'Donny Rose',
    'TJ Striblen',
	'John Von Haden',
	'Conrad Ward',
    'Kevin White',
    'Alan Meebus'
]

const baris = [
    'Kirk Benson',
	'Merlin Friesen',
    'Ben Hancock',
    'Randy Haafke',
    'Darrel Herschberger',
	'Rodney Johnson',
	'Michael Kaas',
	'Chad Knipfer',
    'Anthony Koenig',
	'David Lapakko',
	'Harley Lentz',
	'Mike Olson',
	'Ron Reimer',
	'Matt Richards',
	'Nathan Willbur'
];

const tenors = [
    'David Bechard',
	'Poul-Erik Binderup',
    'Trevor Carlson',
	'Alan Coombs',
    'Gail Crowe',
	'Shel Givens',
	'Philip Hedtke',
    'Kevin Huyck',
	'Randy Rogers',
	'Jeff Schulz',
	'Michael Tate',
    'Rick Van Gomple',
	'Ken Wentworth',
    'James Maclean'
];

const songs = [
    'If the Devil Danced',
    'All of Me',
    'If I Only Had a Brain',
    'That\'s Life',
    "I'm Beginning to See The Light",
    "Two of a Kind, Working' on a Full House",
    "I Can Dream, Can't I?",
    "You're a Heavenly Thing",
    "Mr. Success",
    "Wonderful One"
];

const getMaxCount = () => {
    let maxCount = basses.length;
    if(leads.length > maxCount) {
        maxCount = leads.length;
    }
    if(baris.length > maxCount) {
        maxCount = baris.length;
    }
    if(tenors.length > maxCount) {
        maxCount = tenors.length;
    }

    return maxCount;
}

/**
 * Shuffles array in place. ES6 version
 * @param {Array} a items The array containing the items.
 */
const shuffle = (a) => {
    for (let i = a.length; i; i--) {
        let j = Math.floor(Math.random() * i);
        [a[i - 1], a[j]] = [a[j], a[i - 1]];
    }
}

const getValue = (arr, index) => {
    if(index > arr.length - 1) {
        return arr[index % arr.length];
    } else {
        return arr[index];
    }
}

const shuffleAll = () => {
    shuffle(basses);
    shuffle(leads);
    shuffle(tenors);
    shuffle(baris);
    shuffle(songs);
}

var express = require('express')
var app = express()

app.set('port', (process.env.PORT || 9000));

app.get('/counts', (req, res) => {
    res.send({
        basses: basses.length,
        leads: leads.length,
        baris: baris.length,
        tenors: tenors.length
    })
});

app.get('/basses', (req, res) => {
    dataAccess.getBasses();
    res.send(basses);
});

app.get('/bassesRandom', (req, res) => {
    shuffle(basses);
    res.send(basses[0]);
});

app.get('/leads', (req, res) => {
    res.send(leads);
});

app.get('/leadsRandom', (req, res) => {
    shuffle(leads);
    res.send(leads[0]);
});

app.get('/baris', (req, res) => {
    res.send(baris);
});

app.get('/barisRandom', (req, res) => {
    shuffle(baris);
    res.send(baris[0]);
});

app.get('/tenors', (req, res) => {
    res.send(tenors);
});

app.get('/tenorsRandom', (req, res) => {
    shuffle(tenors);
    res.send(tenors[0]);
});

app.get('/songsRandom', (req, res) => {
    shuffle(songs);
    res.send(songs[0]);
});

app.get('/getRandomQuartets', function (req, res) {
    shuffleAll();

    let quartets = [];
    for ( let i = 0; i < getMaxCount(); i++) {
        let quartet = {
            bass: getValue(basses, i),
            lead: getValue(leads, i),
            bari: getValue(baris, i),
            tenor: getValue(tenors, i),
            song: getValue(songs, i)
        }

        quartets.push(quartet);
    }

    res.send(quartets);
});

app.get('/getSingleRandomQuartet', function(req, res) {
    shuffleAll();

    let quartet = {
        bass: getValue(basses, 0),
        lead: getValue(leads, 0),
        bari: getValue(baris, 0),
        tenor: getValue(tenors, 0),
        song: getValue(songs, 0) + '<br>' + getValue(songs, 1)
    };

    res.send(quartet);
});

app.use(express.static('public'));

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});