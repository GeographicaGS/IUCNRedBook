App.Catalog = {
    categories: [
    {
        title_es: "Unidades Forestales",
        title_en: "Forest units",
        title_fr: "Unidades Forestales",
        icon: "forestales",
        topics: [
            {
                title_es: "Nivel superior",
                title_en: "Upper level",
                title_fr: "Nivel superior",
                layers: [
                    {
                        id: 1,
                        name_es: "Arganales",
                        name_en: "Arganales",
                        name_fr: "Arganales",
                        scientificname: "Argania spinosa",
                        wmsServer:"http://www.iucn-geoportalboran.org/geoserver/alboran/wms?",
                        wmsLayName: "reg_oceanograf",
                        geoNetWk: "http://www.iucn-geoportalboran.org/geonetwork/srv/spa/search?hl=spa#|2486d745-996a-42df-a849-60c0f746dd64",
                        pdf: "lref_marruecos.pdf",
                        page: 1,
                        color: "#ABCD66",
                        order: 1
                    },
                    {
                        id: 2,
                        name_es: "Pinsapares",
                        name_en: "Pinsapares",
                        name_fr: "Pinsapares",
                        scientificname: "Abies pinsapo subsp. maroccana",
                        wmsServer:"",
                        wmsLayName: "",
                        geoNetWk: "",
                        pdf: "lref_marruecos.pdf",
                        page: 2,
                        color: "#894444",
                        order: 2
                    },
                    {
                        id: 3,
                        name_es: "Espartales",
                        name_en: "Espartales",
                        name_fr: "Espartales",
                        scientificname: "Stipa tenacissima",
                        wmsServer:"",
                        wmsLayName: "",
                        geoNetWk: "",
                        pdf: "lref_marruecos.pdf",
                        page: 3,
                        color: "#E8A561",
                        order: 3
                    },
                    {
                        id: 4,
                        name_es: "Cedrales",
                        name_en: "Cedrales",
                        name_fr: "Cedrales",
                        scientificname: "Cedrus atlantica",
                        wmsServer:"",
                        wmsLayName: "",
                        geoNetWk: "",
                        pdf: "lref_marruecos.pdf",
                        page: 4,
                        color: "#9EAAD7",
                        order: 4
                    },
                    {
                        id: 5,
                        name_es: "Sabinares negrales",
                        name_en: "Sabinares negrales",
                        name_fr: "Sabinares negrales",
                        scientificname: "Juniperus phoenicea",
                        wmsServer:"",
                        wmsLayName: "",
                        geoNetWk: "",
                        pdf: "lref_marruecos.pdf",
                        page: 5,
                        color: "#6677CD",
                        order: 5
                    }
                ]
            },
            {
                title_es: "Nivel inferior",
                title_en: "Lower level",
                title_fr: "Nivel inferior",
                layers: [
                    {
                        id: 6,
                        name_es: "Sabinares albares",
                        name_en: "Sabinares albares",
                        name_fr: "Sabinares albares",
                        scientificname: "Juniperus thurifera",
                        wmsServer:"",
                        wmsLayName: "",
                        geoNetWk: "",
                        pdf: "lref_marruecos.pdf",
                        page: 6,
                        color: "#828556",
                        order: 6
                    },
                    {
                        id: 7,
                        name_es: "Pinares de pino negral",
                        name_en: "Pinares de pino negral",
                        name_fr: "Pinares de pino negral",
                        scientificname: "Pinus pinaster subsp. hamiltoni",
                        wmsServer:"",
                        wmsLayName: "",
                        geoNetWk: "",
                        pdf: "lref_marruecos.pdf",
                        page: 7,
                        color: "#E6E600",
                        order: 7
                    }
                ]
            }
        ]
    },
    {
        title_es: "Regionalización Climática",
        title_en: "Regionalización Climática",
        title_fr: "Regionalización Climática",
        icon: "climatica",
        topics: [
            {
                title_es: "Nivel superior",
                title_en: "Nivel superior",
                title_fr: "Nivel superior",
                layers: [
                    {
                        id: 8,
                        name_es: "Ecozona Mediterráneo-Oceánica",
                        name_en: "Ecozona Mediterráneo-Oceánica",
                        name_fr: "Ecozona Mediterráneo-Oceánica",
                        scientificname: "",
                        wmsServer:"",
                        wmsLayName: "",
                        geoNetWk: "",
                        pdf: "",
                        page: "",
                        color: ""
                    },
                    {
                        id: 9,
                        name_es: "Ecozona Mediterránea",
                        name_en: "Ecozona Mediterránea",
                        name_fr: "Ecozona Mediterránea",
                        scientificname: "",
                        wmsServer:"",
                        wmsLayName: "",
                        geoNetWk: "",
                        pdf: "",
                        page: "",
                        color: ""
                    },
                    {
                        id: 10,
                        name_es: "Ecozona Sahariana",
                        name_en: "Ecozona Sahariana",
                        name_fr: "Ecozona Sahariana",
                        scientificname: "",
                        wmsServer:"",
                        wmsLayName: "",
                        geoNetWk: "",
                        pdf: "",
                        page: "",
                        color: ""
                    }
                ]
            },
            {
                title_es: "Nivel inferior",
                title_en: "Nivel inferior",
                title_fr: "Nivel inferior",
                layers: [
                    {
                        id: 11,
                        name_es: "D05",
                        name_en: "D05",
                        name_fr: "D05",
                        scientificname: "",
                        wmsServer:"",
                        wmsLayName: "",
                        geoNetWk: "",
                        pdf: "",
                        page: "",
                        color: ""
                    },
                    {
                        id: 12,
                        name_es: "D01",
                        name_en: "D01",
                        name_fr: "D01",
                        scientificname: "",
                        wmsServer:"",
                        wmsLayName: "",
                        geoNetWk: "",
                        pdf: "",
                        page: "",
                        color: ""
                    }
                ]
            }
        ]
    },
    {
        title_es: "Estado/Tendencia",
        title_en: "Status/Trend",
        title_fr: "État/Tendance",
        icon: "tendencia",
        topics: [
            {
                title_es: "",
                title_en: "",
                title_fr: "",
                layers: [
                    {
                        id: 13,
                        name_es: "Rendimiento basal",
                        name_en: "Rendimiento basal",
                        name_fr: "Rendimiento basal",
                        scientificname: "",
                        wmsServer:"",
                        wmsLayName: "",
                        geoNetWk: "",
                        pdf: "",
                        page: "",
                        color: ""
                    },
                    {
                        id: 14,
                        name_es: "Rendimiento de referencia",
                        name_en: "Rendimiento de referencia",
                        name_fr: "Rendimiento de referencia",
                        scientificname: "",
                        wmsServer:"",
                        wmsLayName: "",
                        geoNetWk: "",
                        pdf: "",
                        page: "",
                        color: ""
                    },
                    {
                        id: 15,
                        name_es: "Aumentándose",
                        name_en: "Increasing",
                        name_fr: "En augmentant",
                        scientificname: "",
                        wmsServer:"",
                        wmsLayName: "",
                        geoNetWk: "",
                        pdf: "",
                        page: "",
                        color: ""
                    }
                ]
            }
        ]
    },
    {
        title_es: "Mapas Históricos",
        title_en: "Mapas Históricos",
        title_fr: "Mapas Históricos",
        icon: "historico",
        topics: [
            {
                title_es: "",
                title_en: "",
                title_fr: "",
                layers: [
                    {
                        id: 13,
                        name_es: "Rendimiento basal",
                        name_en: "Rendimiento basal",
                        name_fr: "Rendimiento basal",
                        scientificname: "",
                        wmsServer:"",
                        wmsLayName: "",
                        geoNetWk: "",
                        pdf: "",
                        page: "",
                        color: ""
                    },
                    {
                        id: 14,
                        name_es: "Rendimiento de referencia",
                        name_en: "Rendimiento de referencia",
                        name_fr: "Rendimiento de referencia",
                        scientificname: "",
                        wmsServer:"",
                        wmsLayName: "",
                        geoNetWk: "",
                        pdf: "",
                        page: "",
                        color: ""
                    },
                    {
                        id: 15,
                        name_es: "Aumentándose",
                        name_en: "Increasing",
                        name_fr: "En augmentant",
                        scientificname: "",
                        wmsServer:"",
                        wmsLayName: "",
                        geoNetWk: "",
                        pdf: "",
                        page: "",
                        color: ""
                    }
                ]
            }
        ]
    },
    {
        title_es: "Espacios Protegidos",
        title_en: "Espacios Protegidos",
        title_fr: "Espacios Protegidos",
        icon: "protegidos",
        topics: [
            {
                title_es: "",
                title_en: "",
                title_fr: "",
                layers: [
                    {
                        id: 13,
                        name_es: "Réserve à Outarde",
                        name_en: "Réserve à Outarde",
                        name_fr: "Réserve à Outarde",
                        scientificname: "",
                        wmsServer:"",
                        wmsLayName: "",
                        geoNetWk: "",
                        pdf: "",
                        page: "",
                        color: ""
                    },
                    {
                        id: 14,
                        name_es: "Chekhar",
                        name_en: "Chekhar",
                        name_fr: "Chekhar",
                        scientificname: "",
                        wmsServer:"",
                        wmsLayName: "",
                        geoNetWk: "",
                        pdf: "",
                        page: "",
                        color: ""
                    },
                    {
                        id: 15,
                        name_es: "Aumentándose",
                        name_en: "Increasing",
                        name_fr: "En augmentant",
                        scientificname: "",
                        wmsServer:"",
                        wmsLayName: "",
                        geoNetWk: "",
                        pdf: "",
                        page: "",
                        color: ""
                    }
                ]
            }
        ]
    }
]
};
