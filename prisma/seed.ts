import { PrismaClient, IncidentCategory, MainCategory, PropertyType, RecordStatus, UseType, UserRole } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.user.upsert({
    where: { email: "admin@propertychronicle.local" },
    update: { role: UserRole.admin, reportCredits: 100 },
    create: {
      email: "admin@propertychronicle.local",
      password: "admin",
      role: UserRole.admin,
      reportCredits: 100,
      acceptedTermsAt: new Date()
    }
  });

  await prisma.user.upsert({
    where: { email: "free@propertychronicle.local" },
    update: {},
    create: {
      email: "free@propertychronicle.local",
      password: "free",
      role: UserRole.free,
      acceptedTermsAt: new Date()
    }
  });

  await prisma.user.upsert({
    where: { email: "subscriber@propertychronicle.local" },
    update: { role: UserRole.subscriber, reportCredits: 10 },
    create: {
      email: "subscriber@propertychronicle.local",
      password: "subscriber",
      role: UserRole.subscriber,
      reportCredits: 10,
      acceptedTermsAt: new Date()
    }
  });

  await upsertPropertyWithIncident({
    id: "prop_sherman_old_colony",
    address: "50 Old Colony Road",
    city: "Toronto",
    province: "ON",
    neighborhood: "North York",
    latitude: 43.7518,
    longitude: -79.4219,
    propertyType: PropertyType.Detached,
    useType: UseType.Residential,
    incident: {
      id: "inc_sherman_homicide",
      title: "Reported homicide investigation",
      mainCategory: MainCategory.PublicSafety,
      category: IncidentCategory.Homicide,
      incidentDate: new Date("2017-12-15"),
      incidentYear: 2017,
      publicSummary:
        "Public reporting identified this address in connection with the deaths of Barry and Honey Sherman, which police later investigated as homicides.",
      sensitive: true,
      source: {
        title: "Victim Honey Sherman - Toronto Police Service homicide case",
        name: "Toronto Police Service",
        url: "https://www.tps.ca/organizational-chart/specialized-operations-command/detective-operations/investigative-services/homicide/case/65/2017/",
        publishedAt: new Date("2017-12-15")
      }
    }
  });

  await upsertPropertyWithIncident({
    id: "prop_grenoble",
    address: "45 Grenoble Drive",
    city: "Toronto",
    province: "ON",
    neighborhood: "Flemingdon Park",
    latitude: 43.7169,
    longitude: -79.3314,
    propertyType: PropertyType.Apartment,
    useType: UseType.Residential,
    incident: {
      id: "inc_grenoble_fire",
      title: "Reported fatal high-rise fire",
      mainCategory: MainCategory.PropertyCondition,
      category: IncidentCategory.Fire,
      incidentDate: new Date("2025-03-19"),
      incidentYear: 2025,
      publicSummary: "Public reporting described a fatal two-alarm fire in a unit at 45 Grenoble Drive.",
      sensitive: true,
      source: {
        title: "Investigation underway into fatal Flemingdon Park fire",
        name: "CP24",
        url: "https://www.cp24.com/local/toronto/2025/03/20/investigation-now-underway-into-fatal-flemingdon-park-fire/",
        publishedAt: new Date("2025-03-20")
      }
    }
  });

  await upsertPropertyWithIncident({
    id: "prop_barbados",
    address: "40 Barbados Boulevard",
    city: "Toronto",
    province: "ON",
    neighborhood: "Scarborough",
    latitude: 43.7477,
    longitude: -79.2321,
    propertyType: PropertyType.Detached,
    useType: UseType.Residential,
    incident: {
      id: "inc_barbados_fire",
      title: "Reported fatal residential fire",
      mainCategory: MainCategory.PropertyCondition,
      category: IncidentCategory.Fire,
      incidentDate: new Date("2016-02-05"),
      incidentYear: 2016,
      publicSummary: "Public reporting described a fatal residential fire at this Scarborough address.",
      sensitive: true,
      source: {
        title: "Fatal fire reported on Barbados Boulevard in Scarborough",
        name: "CBC News",
        url: "https://www.cbc.ca/news/canada/toronto",
        publishedAt: new Date("2016-02-05")
      }
    }
  });

  await upsertPropertyWithIncident({
    id: "prop_wilson_hotel",
    address: "1677 Wilson Avenue",
    city: "Toronto",
    province: "ON",
    neighborhood: "Downsview",
    latitude: 43.7222,
    longitude: -79.5142,
    propertyType: PropertyType.Commercial,
    useType: UseType.Commercial,
    incident: {
      id: "inc_wilson_stabbing",
      title: "Reported fatal targeted stabbing",
      mainCategory: MainCategory.PublicSafety,
      category: IncidentCategory.Homicide,
      incidentDate: new Date("2025-06-22"),
      incidentYear: 2025,
      publicSummary: "Public reporting described a fatal stabbing at 1677 Wilson Avenue, a former hotel used as a shelter facility.",
      sensitive: false,
      source: {
        title: "1 man dead in targeted stabbing at North York shelter",
        name: "CityNews Toronto",
        url: "https://toronto.citynews.ca/2025/06/22/police-investigating-targeted-stabbing-in-north-york-that-sent-2-people-to-hospital/",
        publishedAt: new Date("2025-06-22")
      }
    }
  });

  await upsertPropertyWithIncident({
    id: "prop_keg_mansion",
    address: "515 Jarvis Street",
    city: "Toronto",
    province: "ON",
    neighborhood: "Church-Wellesley",
    latitude: 43.6668,
    longitude: -79.3779,
    propertyType: PropertyType.Commercial,
    useType: UseType.Commercial,
    incident: {
      id: "inc_keg_haunting",
      title: "Reported haunting lore",
      mainCategory: MainCategory.Supernatural,
      category: IncidentCategory.ParanormalAllegedHaunting,
      incidentYear: 1915,
      publicSummary: "Public-facing historical and tourism materials have described alleged haunting stories connected to this building.",
      sensitive: false,
      source: {
        title: "Keg Mansion - Gothic heritage home and haunted tales",
        name: "Toronto Journey 416",
        url: "https://www.torontojourney416.com/keg-mansion/",
        publishedAt: new Date("2021-04-26")
      }
    }
  });

  await upsertPropertyWithIncident({
    id: "prop_casa_loma",
    address: "1 Austin Terrace",
    city: "Toronto",
    province: "ON",
    neighborhood: "Casa Loma",
    latitude: 43.678,
    longitude: -79.4094,
    propertyType: PropertyType.Institutional,
    useType: UseType.PublicInstitutional,
    incident: {
      id: "inc_casa_loma_legend",
      title: "Reported historical haunting lore",
      mainCategory: MainCategory.Supernatural,
      category: IncidentCategory.UrbanLegend,
      incidentYear: 1914,
      publicSummary: "Tourism and local-interest sources have described alleged ghost stories and legends associated with Casa Loma.",
      sensitive: false,
      source: {
        title: "Casa Loma history and ghost stories",
        name: "Destination Toronto",
        url: "https://www.destinationtoronto.com/things-to-do/attractions/casa-loma/"
      }
    }
  });
}

async function upsertPropertyWithIncident(input: {
  id: string;
  address: string;
  city: string;
  province: string;
  neighborhood: string;
  latitude: number;
  longitude: number;
  propertyType: PropertyType;
  useType: UseType;
  incident: {
    id: string;
    title: string;
    mainCategory: MainCategory;
    category: IncidentCategory;
    incidentDate?: Date;
    incidentYear: number;
    publicSummary: string;
    sensitive: boolean;
    source: {
      title: string;
      name: string;
      url: string;
      publishedAt?: Date;
    };
  };
}) {
  await prisma.propertyRecord.upsert({
    where: { id: input.id },
    update: {
      address: input.address,
      city: input.city,
      province: input.province,
      neighborhood: input.neighborhood,
      latitude: input.latitude,
      longitude: input.longitude,
      propertyType: input.propertyType,
      useType: input.useType
    },
    create: {
      id: input.id,
      address: input.address,
      city: input.city,
      province: input.province,
      neighborhood: input.neighborhood,
      latitude: input.latitude,
      longitude: input.longitude,
      propertyType: input.propertyType,
      useType: input.useType
    }
  });

  await prisma.incident.upsert({
    where: { id: input.incident.id },
    update: {
      title: input.incident.title,
      mainCategory: input.incident.mainCategory,
      category: input.incident.category,
      incidentDate: input.incident.incidentDate,
      incidentYear: input.incident.incidentYear,
      publicSummary: input.incident.publicSummary,
      sensitive: input.incident.sensitive,
      reportAllowed: true,
      status: RecordStatus.Approved
    },
    create: {
      id: input.incident.id,
      propertyId: input.id,
      title: input.incident.title,
      mainCategory: input.incident.mainCategory,
      category: input.incident.category,
      incidentDate: input.incident.incidentDate,
      incidentYear: input.incident.incidentYear,
      publicSummary: input.incident.publicSummary,
      internalNotes: "Seed record. Confirm source before production launch.",
      status: RecordStatus.Approved,
      sensitive: input.incident.sensitive,
      reportAllowed: true,
      supernatural: input.incident.mainCategory === MainCategory.Supernatural
    }
  });

  await prisma.source.upsert({
    where: { id: `src_${input.incident.id}` },
    update: {
      title: input.incident.source.title,
      name: input.incident.source.name,
      url: input.incident.source.url,
      publishedAt: input.incident.source.publishedAt,
      retrievedAt: new Date("2026-05-09")
    },
    create: {
      id: `src_${input.incident.id}`,
      incidentId: input.incident.id,
      title: input.incident.source.title,
      name: input.incident.source.name,
      url: input.incident.source.url,
      publishedAt: input.incident.source.publishedAt,
      retrievedAt: new Date("2026-05-09")
    }
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
