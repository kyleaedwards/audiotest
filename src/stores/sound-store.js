const SOUNDS = [
    {id: 1, key: "empire-jams-pt-1", name: "Empire Jams Pt. 1"},
    {id: 2, key: "empire-jams-pt-2", name: "Empire Jams Pt. 2"},
    {id: 3, key: "side1track1", name: "Side 1 Track 1"},
    {id: 4, key: "beer%20garden", name: "Beer Garden"},
    {id: 5, key: "JP_061016_p1", name: "JP 06-10-16 Pt. 1"}
]
const SOUNDSHASH = SOUNDS.reduce((prev, item) => { prev[item.id] = item; return prev }, {})

export default {
    getAllSounds: () => SOUNDS,
    getSound: (id) => SOUNDSHASH[id]
}
