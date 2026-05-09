import type { Store } from "./types";

const now = new Date().toISOString();

export const seedStore: Store = {
  users: [
    {
      id: "user_admin",
      email: "admin@propertychronicle.local",
      password: "admin",
      role: "admin",
      reportCredits: 100,
      acceptedTermsAt: now,
      createdAt: now
    },
    {
      id: "user_free",
      email: "free@propertychronicle.local",
      password: "free",
      role: "free",
      reportCredits: 0,
      acceptedTermsAt: now,
      createdAt: now
    },
    {
      id: "user_subscriber",
      email: "subscriber@propertychronicle.local",
      password: "subscriber",
      role: "subscriber",
      reportCredits: 10,
      acceptedTermsAt: now,
      createdAt: now
    }
  ],
  properties: [
    {
      id: "prop_sherman_old_colony",
      address: "50 Old Colony Road",
      city: "Toronto",
      province: "ON",
      neighborhood: "North York",
      latitude: 43.7518,
      longitude: -79.4219,
      propertyType: "Detached",
      useType: "Residential",
      viewPrecision: "exact",
      createdAt: now,
      updatedAt: now
    },
    {
      id: "prop_grenoble",
      address: "45 Grenoble Drive",
      city: "Toronto",
      province: "ON",
      neighborhood: "Flemingdon Park",
      latitude: 43.7169,
      longitude: -79.3314,
      propertyType: "Apartment",
      useType: "Residential",
      viewPrecision: "exact",
      createdAt: now,
      updatedAt: now
    },
    {
      id: "prop_barbados",
      address: "40 Barbados Boulevard",
      city: "Toronto",
      province: "ON",
      neighborhood: "Scarborough",
      latitude: 43.7477,
      longitude: -79.2321,
      propertyType: "Detached",
      useType: "Residential",
      viewPrecision: "exact",
      createdAt: now,
      updatedAt: now
    },
    {
      id: "prop_wilson_hotel",
      address: "1677 Wilson Avenue",
      city: "Toronto",
      province: "ON",
      neighborhood: "Downsview",
      latitude: 43.7222,
      longitude: -79.5142,
      propertyType: "Commercial",
      useType: "Commercial",
      viewPrecision: "exact",
      createdAt: now,
      updatedAt: now
    },
    {
      id: "prop_keg_mansion",
      address: "515 Jarvis Street",
      city: "Toronto",
      province: "ON",
      neighborhood: "Church-Wellesley",
      latitude: 43.6668,
      longitude: -79.3779,
      propertyType: "Commercial",
      useType: "Commercial",
      viewPrecision: "exact",
      createdAt: now,
      updatedAt: now
    },
    {
      id: "prop_casa_loma",
      address: "1 Austin Terrace",
      city: "Toronto",
      province: "ON",
      neighborhood: "Casa Loma",
      latitude: 43.678,
      longitude: -79.4094,
      propertyType: "Institutional",
      useType: "Public / Institutional",
      viewPrecision: "exact",
      createdAt: now,
      updatedAt: now
    }
  ],
  incidents: [
    {
      id: "inc_sherman_homicide",
      propertyId: "prop_sherman_old_colony",
      title: "Reported homicide investigation",
      mainCategory: "Public Safety",
      category: "Homicide",
      incidentDate: "2017-12-15",
      incidentYear: 2017,
      publicSummary:
        "Public reporting identified this address in connection with the deaths of Barry and Honey Sherman, which police later investigated as homicides.",
      internalNotes: "Seed record. Keep wording factual and source-attributed.",
      status: "Approved",
      sensitive: true,
      reportAllowed: true,
      supernatural: false,
      sourceIds: ["src_sherman_cbc"],
      updatedAt: now
    },
    {
      id: "inc_grenoble_homicide",
      propertyId: "prop_grenoble",
      title: "Reported fatal high-rise fire",
      mainCategory: "Property Condition",
      category: "Fire",
      incidentDate: "2025-03-19",
      incidentYear: 2025,
      publicSummary:
        "Public reporting described a fatal two-alarm fire in a unit at 45 Grenoble Drive.",
      internalNotes: "Source provides exact building address and fire details.",
      status: "Approved",
      sensitive: true,
      reportAllowed: true,
      supernatural: false,
      sourceIds: ["src_grenoble_tps"],
      updatedAt: now
    },
    {
      id: "inc_barbados_fire",
      propertyId: "prop_barbados",
      title: "Reported fatal residential fire",
      mainCategory: "Property Condition",
      category: "Fire",
      incidentDate: "2016-02-05",
      incidentYear: 2016,
      publicSummary: "Public reporting described a fatal residential fire at this Scarborough address.",
      internalNotes: "Address and incident drawn from public reporting.",
      status: "Approved",
      sensitive: true,
      reportAllowed: true,
      supernatural: false,
      sourceIds: ["src_barbados_cbc"],
      updatedAt: now
    },
    {
      id: "inc_wilson_mass_shooting",
      propertyId: "prop_wilson_hotel",
      title: "Reported fatal targeted stabbing",
      mainCategory: "Public Safety",
      category: "Homicide",
      incidentDate: "2025-06-22",
      incidentYear: 2025,
      publicSummary:
        "Public reporting described a fatal stabbing at 1677 Wilson Avenue, a former hotel used as a shelter facility.",
      internalNotes: "Commercial/civic context. Source provides exact address.",
      status: "Approved",
      sensitive: false,
      reportAllowed: true,
      supernatural: false,
      sourceIds: ["src_wilson_cbc"],
      updatedAt: now
    },
    {
      id: "inc_keg_haunting",
      propertyId: "prop_keg_mansion",
      title: "Reported haunting lore",
      mainCategory: "Supernatural",
      category: "Paranormal / Alleged Haunting",
      incidentYear: 1915,
      publicSummary:
        "Public-facing historical and tourism materials have described alleged haunting stories connected to this building.",
      internalNotes: "Commercial property. Supernatural layer off by default.",
      status: "Approved",
      sensitive: false,
      reportAllowed: true,
      supernatural: true,
      sourceIds: ["src_keg_blogto"],
      updatedAt: now
    },
    {
      id: "inc_casa_loma_legend",
      propertyId: "prop_casa_loma",
      title: "Reported historical haunting lore",
      mainCategory: "Supernatural",
      category: "Urban Legend",
      incidentYear: 1914,
      publicSummary:
        "Tourism and local-interest sources have described alleged ghost stories and legends associated with Casa Loma.",
      internalNotes: "Public institutional/tourism location. Good low-risk supernatural seed.",
      status: "Approved",
      sensitive: false,
      reportAllowed: true,
      supernatural: true,
      sourceIds: ["src_casa_loma_to"],
      updatedAt: now
    }
  ],
  sources: [
    {
      id: "src_sherman_cbc",
      incidentId: "inc_sherman_homicide",
      title: "Victim Honey Sherman - Toronto Police Service homicide case",
      name: "Toronto Police Service",
      url: "https://www.tps.ca/organizational-chart/specialized-operations-command/detective-operations/investigative-services/homicide/case/65/2017/",
      publishedAt: "2017-12-15",
      retrievedAt: "2026-05-05"
    },
    {
      id: "src_grenoble_tps",
      incidentId: "inc_grenoble_homicide",
      title: "Investigation underway into fatal Flemingdon Park fire",
      name: "CP24",
      url: "https://www.cp24.com/local/toronto/2025/03/20/investigation-now-underway-into-fatal-flemingdon-park-fire/",
      publishedAt: "2025-03-20",
      retrievedAt: "2026-05-05"
    },
    {
      id: "src_barbados_cbc",
      incidentId: "inc_barbados_fire",
      title: "Fatal fire reported on Barbados Boulevard in Scarborough",
      name: "CBC News",
      url: "https://www.cbc.ca/news/canada/toronto",
      publishedAt: "2016-02-05",
      retrievedAt: "2026-05-05"
    },
    {
      id: "src_wilson_cbc",
      incidentId: "inc_wilson_mass_shooting",
      title: "1 man dead in targeted stabbing at North York shelter",
      name: "CityNews Toronto",
      url: "https://toronto.citynews.ca/2025/06/22/police-investigating-targeted-stabbing-in-north-york-that-sent-2-people-to-hospital/",
      publishedAt: "2025-06-22",
      retrievedAt: "2026-05-05"
    },
    {
      id: "src_keg_blogto",
      incidentId: "inc_keg_haunting",
      title: "Keg Mansion - Gothic heritage home and haunted tales",
      name: "Toronto Journey 416",
      url: "https://www.torontojourney416.com/keg-mansion/",
      publishedAt: "2021-04-26",
      retrievedAt: "2026-05-05"
    },
    {
      id: "src_casa_loma_to",
      incidentId: "inc_casa_loma_legend",
      title: "Casa Loma history and ghost stories",
      name: "Destination Toronto",
      url: "https://www.destinationtoronto.com/things-to-do/attractions/casa-loma/",
      retrievedAt: "2026-05-05"
    }
  ],
  submissions: [],
  savedProperties: [],
  reports: [],
  auditLogs: [],
  importBatches: [],
  correctionRequests: []
};
