const MandalList = [
    {
        agra :[
            "agra", "mathura", "firozabad", "mainpuri"
        ]
    },
    {
        aligarh :[
            "aligarh", "hatharas", "kashganj", "etah"
        ]
    },
    {
        allahabad : [
            "allahabad", "fatehpur", "kaushambi", "pratapgarh"
        ]
    },
    {
        lucknow: [
            "lucknow", "hardoi", "lakhimpur", "unnao", "raebareli", "sitapur"
        ],
    },
    {
        ayodhya: [
            "barabanki", "ayodhya", "sultanpur", "amethi", "ambedkarnagar"
        ]
    },
    {
        azamgarh : [
            "azamgarh", "mau", "balia"
        ]
    },
    {
        basti : [
            "basti", "sant kabir nagar", "siddharth nagar"
        ]
    },
    {
        bareilly : [
            "pilibhit", "bareilly", "shahanjahapur", "badaun" 
        ]
    },
    {
        chitrakoot : [
            "chitrakoot", "banda", "hamirpur", "mahoba"
        ]
    },
    {
        gonda : [
            "gonda", "bahraich", "shravasti", "balrampur"
        ]
    },
    {
        gorakhpur : [
            "gorakhpur", "kushinagar", "deoria", "maharajganj"
        ]
    },
    {
        jhansi : [
            "jhansi", "jalon", "lalitpur"
        ]
    },
    {
        kanpur: [
            "kanpur", "itawah", "kanpur dehat", "kannauj", "auraiya", "farukhabaad"
        ]
    }, 
    {
        meerut : [
            "meerut", "baghpat", "bulandarshahar", "hapur", "noida", "ghaziabad"
        ]
    },
    {
        mirzapur : [
            "mirzapur", "sonbhadra", "bhadohi"
        ]
    },
    {
        muradabad : [
            "muradabad", "rampur", "sambhal", "amroha", "bijnor"
        ]
    },{
        sharanpur : [
            "sharanpur" , "shamli", "m. nagar"
        ]
    },
    {
        varanasi : [
            "varanasi", "chandauli", "jaunpur", "gazipur"
        ]
    }
]

export const districtList = (mandal) => {
    MandalList.map(mandalName => {
        const district = mandalName[mandal]
        return district
    })
}


export default MandalList