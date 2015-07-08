App.Catalog = {
    categories: [
    {
        title_es: "Unidades Forestales",
        title_fr: "Unités forestières",
        icon: "forestales",
        topics: [
            {
                title_es: "Nivel superior",
                title_fr: "Niveau supérieur",
                layers: [
                    {
                        id: 1,
                        name_es: "Arganales",
                        name_fr: "Arganales",
                        scientificname: "Argania spinosa",
                        wmsServer:"http://dev.iucnredbook.org/geoserver/alboran/wms?",
                        wmsLayName: "reg_oceanograf",
                        geoNetWk: "http://dev.iucnredbook.org/geonetwork/srv/spa/search?hl=spa#|2486d745-996a-42df-a849-60c0f746dd64",
                        pdf_es: "lref_marruecos.pdf",
                        pdf_fr: "lref_marruecos.pdf",
                        page_es: 103,
                        page_fr: 103,
                        gis: "arganales.shp",
                        xls: "arganales.xls",
                        color: "#ABCD66",
                        order: 1
                    },
                    {
                        id: 2,
                        name_es: "Pinsapares",
                        name_fr: "Pinsapares",
                        scientificname: "Abies pinsapo subsp. maroccana",
                        wmsServer:"http://dev.iucnredbook.org/geoserver/alboran/wms?",
                        wmsLayName: "frentes_oceanog",
                        geoNetWk: "http://dev.iucnredbook.org/geonetwork/srv/spa/search?hl=spa#|964bc35b-9828-4f32-9456-266475cb4832",
                        pdf_es: "lref_marruecos.pdf",
                        pdf_fr: "lref_marruecos.pdf",
                        page_es: 95,
                        page_fr: 95,
                        gis: "pinsapares.shp",
                        xls: "pinsapares.xls",
                        color: "#894444",
                        order: 2
                    },
                    {
                        id: 3,
                        name_es: "Espartales",
                        name_fr: "Espartales",
                        scientificname: "Stipa tenacissima",
                        wmsServer:"http://dev.iucnredbook.org/geoserver/alboran/wms?",
                        wmsLayName: "abanico_deltaico",
                        geoNetWk: "http://dev.iucnredbook.org/geonetwork/srv/spa/search?hl=spa#|964bc35b-9828-4f32-9456-266475cb4832",
                        pdf_es: "lref_marruecos.pdf",
                        pdf_fr: "lref_marruecos.pdf",
                        page_es: 99,
                        page_fr: 99,
                        gis: "espartales.shp",
                        xls: "espartales.xls",
                        color: "#E8A561",
                        order: 3
                    },
                    {
                        id: 4,
                        name_es: "Cedrales",
                        name_fr: "Cedrales",
                        scientificname: "Cedrus atlantica",
                        wmsServer: "http://dev.iucnredbook.org/geoserver/alboran_tortugas/wms?",
                        wmsLayName: "coriacea",
                        geoNetWk: "",
                        pdf_es: "lref_marruecos.pdf",
                        pdf_fr: "lref_marruecos.pdf",
                        page_es: 108,
                        page_fr: 108,
                        gis: "cedrales.shp",
                        xls: "cedrales.xls",
                        color: "#9EAAD7",
                        order: 4
                    },
                    {
                        id: 5,
                        name_es: "Sabinares negrales",
                        name_fr: "Sabinares negrales",
                        scientificname: "Juniperus phoenicea",
                        wmsServer:"",
                        wmsLayName: "",
                        geoNetWk: "",
                        pdf_es: "lref_marruecos.pdf",
                        pdf_fr: "lref_marruecos.pdf",
                        page_es: 5,
                        page_fr: 5,
                        gis: "seb_negrales.shp",
                        xls: "seb_negrales.xls",
                        color: "#6677CD",
                        order: 5
                    }
                ]
            },
            {
                title_es: "Nivel inferior",
                title_fr: "Niveau inférieur",
                layers: [
                    {
                        id: 6,
                        name_es: "Sabinares albares",
                        name_fr: "Sabinares albares",
                        scientificname: "Juniperus thurifera",
                        wmsServer:"",
                        wmsLayName: "",
                        geoNetWk: "",
                        pdf_es: "lref_marruecos.pdf",
                        pdf_fr: "lref_marruecos.pdf",
                        page_es: 6,
                        page_fr: 6,
                        gis: "seb_albares.shp",
                        xls: "seb_albares.xls",
                        color: "#828556",
                        order: 6
                    },
                    {
                        id: 7,
                        name_es: "Pinares de pino negral",
                        name_fr: "Pinares de pino negral",
                        scientificname: "Pinus pinaster subsp. hamiltoni",
                        wmsServer:"",
                        wmsLayName: "",
                        geoNetWk: "",
                        pdf_es: "lref_marruecos.pdf",
                        pdf_fr: "lref_marruecos.pdf",
                        page_es: 7,
                        page_fr: 7,
                        gis: "pinares_negral.shp",
                        xls: "pinares_negral.xls",
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
                        id: 16,
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
                        id: 17,
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
                        id: 18,
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
                        id: 19,
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
                        id: 20,
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
                        id: 21,
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
