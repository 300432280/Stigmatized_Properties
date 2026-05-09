import {
  IncidentCategory,
  MainCategory,
  PrismaClient,
  PropertyType,
  RecordStatus,
  UseType,
  ViewPrecision
} from "@prisma/client";

const prisma = new PrismaClient();

type ResearchedRecord = {
  property: {
    id: string;
    address: string;
    city: string;
    province: string;
    neighborhood: string;
    latitude: number;
    longitude: number;
    propertyType: PropertyType;
    useType: UseType;
    viewPrecision?: ViewPrecision;
  };
  incident: {
    id: string;
    title: string;
    mainCategory: MainCategory;
    category: IncidentCategory;
    incidentDate?: string;
    incidentYear: number;
    publicSummary: string;
    sensitive: boolean;
    reportAllowed?: boolean;
    source: {
      id: string;
      title: string;
      name: string;
      url: string;
      publishedAt?: string;
      retrievedAt: string;
    };
  };
};

const eastTorontoRecords: ResearchedRecord[] = [
  {
    property: {
      id: "prop_coxwell_172",
      address: "172 Coxwell Avenue",
      city: "Toronto",
      province: "ON",
      neighborhood: "Woodbine Corridor",
      latitude: 43.6708387,
      longitude: -79.3186146,
      propertyType: PropertyType.SemiDetached,
      useType: UseType.Residential
    },
    incident: {
      id: "inc_coxwell_172_fatal_fire_2024",
      title: "Reported fatal residential fire",
      mainCategory: MainCategory.PropertyCondition,
      category: IncidentCategory.Fire,
      incidentDate: "2024-01-18",
      incidentYear: 2024,
      publicSummary:
        "Public reporting described a fatal fire at 172 Coxwell Avenue on January 18, 2024. The report said Toronto Fire Services, Toronto police, and the Ontario Fire Marshal were expected to investigate.",
      sensitive: true,
      source: {
        id: "src_coxwell_172_fatal_fire_2024_beach_metro",
        title: "One person has died in fire at house on Coxwell Avenue",
        name: "Beach Metro Community News",
        url: "https://beachmetro.com/2024/01/18/one-person-has-died-in-fire-at-house-on-coxwell-avenue/",
        publishedAt: "2024-01-18",
        retrievedAt: "2026-05-09"
      }
    }
  },
  {
    property: {
      id: "prop_gainsborough_95",
      address: "95 Gainsborough Road",
      city: "Toronto",
      province: "ON",
      neighborhood: "Upper Beaches",
      latitude: 43.6736554,
      longitude: -79.3179608,
      propertyType: PropertyType.Detached,
      useType: UseType.Residential
    },
    incident: {
      id: "inc_gainsborough_95_fatal_fire_2021",
      title: "Reported fatal residential fire",
      mainCategory: MainCategory.PropertyCondition,
      category: IncidentCategory.Fire,
      incidentDate: "2021-01-29",
      incidentYear: 2021,
      publicSummary:
        "The Office of the Fire Marshal and Toronto Fire Services reported that a January 29, 2021 fire at 95 Gainsborough Road resulted in deaths and that their investigation found an electrical failure and no working smoke alarms.",
      sensitive: true,
      source: {
        id: "src_gainsborough_95_fire_marshal_2021",
        title: "No Working Smoke Alarms in Fatal Fire at 95 Gainsborough Road in Toronto: Office of the Fire Marshal, Toronto Fire Services",
        name: "Office of the Fire Marshal and Emergency Management",
        url: "https://www.newswire.ca/news-releases/no-working-smoke-alarms-in-fatal-fire-at-95-gainsborough-road-in-toronto-office-of-the-fire-marshal-toronto-fire-services-831727173.html",
        publishedAt: "2021-03-12",
        retrievedAt: "2026-05-09"
      }
    }
  },
  {
    property: {
      id: "prop_danforth_1530",
      address: "1530 Danforth Avenue",
      city: "Toronto",
      province: "ON",
      neighborhood: "Danforth",
      latitude: 43.6832579,
      longitude: -79.3247075,
      propertyType: PropertyType.Commercial,
      useType: UseType.Commercial
    },
    incident: {
      id: "inc_danforth_1530_homicide_2015",
      title: "Reported homicide investigation",
      mainCategory: MainCategory.PublicSafety,
      category: IncidentCategory.Homicide,
      incidentDate: "2015-05-19",
      incidentYear: 2015,
      publicSummary:
        "Toronto Police Service records state that police responded to a shooting at 1530 Danforth Avenue on May 19, 2015, and that the victim later died after being transported to hospital.",
      sensitive: true,
      source: {
        id: "src_danforth_1530_tps_homicide_2015",
        title: "Victim Abdiweli YUSUF",
        name: "Toronto Police Service",
        url: "https://www.tps.ca/organizational-chart/specialized-operations-command/detective-operations/investigative-services/homicide/case/16/2015/",
        publishedAt: "2015-05-19",
        retrievedAt: "2026-05-09"
      }
    }
  },
  {
    property: {
      id: "prop_danforth_2301",
      address: "2301 Danforth Avenue",
      city: "Toronto",
      province: "ON",
      neighborhood: "East End-Danforth",
      latitude: 43.6867455,
      longitude: -79.3075192,
      propertyType: PropertyType.Condo,
      useType: UseType.Residential
    },
    incident: {
      id: "inc_danforth_2301_homicide_2021",
      title: "Reported homicide investigation",
      mainCategory: MainCategory.PublicSafety,
      category: IncidentCategory.Homicide,
      incidentDate: "2021-02-09",
      incidentYear: 2021,
      publicSummary:
        "Toronto Police Service records state that police responded to an emergency medical call at a parking garage at 2301 Danforth Avenue on February 9, 2021, where the victim was pronounced dead at the scene.",
      sensitive: true,
      source: {
        id: "src_danforth_2301_tps_homicide_2021",
        title: "Victim Harry LAINAS",
        name: "Toronto Police Service",
        url: "https://www.tps.ca/organizational-chart/specialized-operations-command/detective-operations/investigative-services/homicide/case/9/2021/",
        publishedAt: "2021-02-09",
        retrievedAt: "2026-05-09"
      }
    }
  },
  {
    property: {
      id: "prop_danforth_2575",
      address: "2575 Danforth Avenue",
      city: "Toronto",
      province: "ON",
      neighborhood: "East End-Danforth",
      latitude: 43.6881515,
      longitude: -79.3003785,
      propertyType: PropertyType.Apartment,
      useType: UseType.Residential,
      viewPrecision: ViewPrecision.building_only
    },
    incident: {
      id: "inc_danforth_2575_grow_op_fire_2014",
      title: "Reported grow-operation discovered after fire",
      mainCategory: MainCategory.PropertyCondition,
      category: IncidentCategory.GrowOpDrugLab,
      incidentDate: "2014-12-17",
      incidentYear: 2014,
      publicSummary:
        "Public reporting described a fire in a unit at 2575 Danforth Avenue where responders found evidence of a marijuana grow-operation and police investigated.",
      sensitive: true,
      source: {
        id: "src_danforth_2575_citynews_grow_op_2014",
        title: "Firefighters discover grow-op in Danforth apartment tower",
        name: "CityNews Toronto",
        url: "https://toronto.citynews.ca/2014/12/17/firefighters-discover-grow-op-in-danforth-apartment-tower-3/",
        publishedAt: "2014-12-17",
        retrievedAt: "2026-05-09"
      }
    }
  }
];

async function upsertResearchedRecord(record: ResearchedRecord, createdById?: string) {
  await prisma.propertyRecord.upsert({
    where: { id: record.property.id },
    update: {
      address: record.property.address,
      city: record.property.city,
      province: record.property.province,
      neighborhood: record.property.neighborhood,
      latitude: record.property.latitude,
      longitude: record.property.longitude,
      propertyType: record.property.propertyType,
      useType: record.property.useType,
      viewPrecision: record.property.viewPrecision ?? ViewPrecision.exact
    },
    create: {
      id: record.property.id,
      address: record.property.address,
      city: record.property.city,
      province: record.property.province,
      neighborhood: record.property.neighborhood,
      latitude: record.property.latitude,
      longitude: record.property.longitude,
      propertyType: record.property.propertyType,
      useType: record.property.useType,
      viewPrecision: record.property.viewPrecision ?? ViewPrecision.exact
    }
  });

  await prisma.incident.upsert({
    where: { id: record.incident.id },
    update: {
      title: record.incident.title,
      mainCategory: record.incident.mainCategory,
      category: record.incident.category,
      incidentDate: record.incident.incidentDate ? new Date(record.incident.incidentDate) : null,
      incidentYear: record.incident.incidentYear,
      publicSummary: record.incident.publicSummary,
      internalNotes: "Public-source research batch: East Toronto / Danforth-Coxwell corridor.",
      status: RecordStatus.Approved,
      sensitive: record.incident.sensitive,
      reportAllowed: record.incident.reportAllowed ?? true,
      supernatural: record.incident.mainCategory === MainCategory.Supernatural,
      createdById: createdById ?? null
    },
    create: {
      id: record.incident.id,
      propertyId: record.property.id,
      title: record.incident.title,
      mainCategory: record.incident.mainCategory,
      category: record.incident.category,
      incidentDate: record.incident.incidentDate ? new Date(record.incident.incidentDate) : null,
      incidentYear: record.incident.incidentYear,
      publicSummary: record.incident.publicSummary,
      internalNotes: "Public-source research batch: East Toronto / Danforth-Coxwell corridor.",
      status: RecordStatus.Approved,
      sensitive: record.incident.sensitive,
      reportAllowed: record.incident.reportAllowed ?? true,
      supernatural: record.incident.mainCategory === MainCategory.Supernatural,
      createdById: createdById ?? null
    }
  });

  await prisma.source.upsert({
    where: { id: record.incident.source.id },
    update: {
      incidentId: record.incident.id,
      title: record.incident.source.title,
      name: record.incident.source.name,
      url: record.incident.source.url,
      publishedAt: record.incident.source.publishedAt ? new Date(record.incident.source.publishedAt) : null,
      retrievedAt: new Date(record.incident.source.retrievedAt)
    },
    create: {
      id: record.incident.source.id,
      incidentId: record.incident.id,
      title: record.incident.source.title,
      name: record.incident.source.name,
      url: record.incident.source.url,
      publishedAt: record.incident.source.publishedAt ? new Date(record.incident.source.publishedAt) : null,
      retrievedAt: new Date(record.incident.source.retrievedAt)
    }
  });
}

async function main() {
  const admin = await prisma.user.findUnique({ where: { email: "admin@propertychronicle.local" } });

  for (const record of eastTorontoRecords) {
    await upsertResearchedRecord(record, admin?.id);
  }

  await prisma.auditLog.create({
    data: {
      userId: admin?.id,
      action: "research_batch_upsert",
      entityType: "research_batch",
      entityId: "east_toronto_danforth_coxwell_2026_05_09",
      metadata: {
        area: "East Toronto / Danforth-Coxwell corridor",
        recordCount: eastTorontoRecords.length,
        sourceMode: "manual public-source research"
      }
    }
  });

  console.log(`Upserted ${eastTorontoRecords.length} East Toronto public-source records.`);
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
