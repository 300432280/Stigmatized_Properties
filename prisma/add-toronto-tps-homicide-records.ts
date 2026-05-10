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

type TpsHomicideRecord = {
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
    incidentDate: string;
    incidentYear: number;
    publicSummary: string;
    source: {
      id: string;
      title: string;
      url: string;
      publishedAt: string;
    };
  };
};

const records: TpsHomicideRecord[] = [
  {
    property: {
      id: "prop_avenue_916",
      address: "916 Avenue Road",
      city: "Toronto",
      province: "ON",
      neighborhood: "Yonge-Eglinton",
      latitude: 43.7010639,
      longitude: -79.4072349,
      propertyType: PropertyType.Apartment,
      useType: UseType.Residential
    },
    incident: {
      id: "inc_avenue_916_homicide_2022",
      title: "Reported homicide investigation",
      incidentDate: "2022-01-26",
      incidentYear: 2022,
      publicSummary:
        "Toronto Police Service records state that officers responded to an unknown-trouble call at 916 Avenue Road on January 23, 2022, where a man was found with life-threatening injuries and later died in hospital.",
      source: {
        id: "src_avenue_916_tps_homicide_2022",
        title: "Victim Ikechidiadi KAJA",
        url: "https://www.tps.ca/organizational-chart/specialized-operations-command/detective-operations/investigative-services/homicide/case/10/2022/",
        publishedAt: "2022-01-26"
      }
    }
  },
  {
    property: {
      id: "prop_queen_w_232",
      address: "232 Queen Street West",
      city: "Toronto",
      province: "ON",
      neighborhood: "Downtown West",
      latitude: 43.6503174,
      longitude: -79.3902501,
      propertyType: PropertyType.Commercial,
      useType: UseType.Commercial,
      viewPrecision: ViewPrecision.building_only
    },
    incident: {
      id: "inc_queen_w_232_homicide_2022",
      title: "Reported homicide investigation",
      incidentDate: "2022-05-24",
      incidentYear: 2022,
      publicSummary:
        "Toronto Police Service records state that officers responded to a medical call out front of 232 Queen Street West on May 22, 2022, after a reported assault; the victim later died in hospital.",
      source: {
        id: "src_queen_w_232_tps_homicide_2022",
        title: "Victim Jason RUMLEY",
        url: "https://www.tps.ca/organizational-chart/specialized-operations-command/detective-operations/investigative-services/homicide/case/27/2022/",
        publishedAt: "2022-05-24"
      }
    }
  },
  {
    property: {
      id: "prop_massey_5",
      address: "5 Massey Square",
      city: "Toronto",
      province: "ON",
      neighborhood: "Taylor-Massey",
      latitude: 43.696136,
      longitude: -79.2929234,
      propertyType: PropertyType.Apartment,
      useType: UseType.Residential,
      viewPrecision: ViewPrecision.building_only
    },
    incident: {
      id: "inc_massey_5_homicide_2022",
      title: "Reported homicide investigation",
      incidentDate: "2022-12-10",
      incidentYear: 2022,
      publicSummary:
        "Toronto Police Service records state that police responded to a shooting at 5 Massey Square on December 10, 2022, where a teen was found outside the building and pronounced dead at the scene.",
      source: {
        id: "src_massey_5_tps_homicide_2022",
        title: "Victim David PETROVIC",
        url: "https://www.tps.ca/organizational-chart/specialized-operations-command/detective-operations/investigative-services/homicide/case/67/2022/",
        publishedAt: "2022-12-10"
      }
    }
  },
  {
    property: {
      id: "prop_kingston_3406",
      address: "3406 Kingston Road",
      city: "Toronto",
      province: "ON",
      neighborhood: "Scarborough Village",
      latitude: 43.7367326,
      longitude: -79.2197219,
      propertyType: PropertyType.Commercial,
      useType: UseType.Commercial
    },
    incident: {
      id: "inc_kingston_3406_homicide_2020",
      title: "Reported homicide investigation",
      incidentDate: "2020-01-25",
      incidentYear: 2020,
      publicSummary:
        "Toronto Police Service records state that police responded to a shooting call at 3406 Kingston Road on January 25, 2020; the victim was found inside the business and pronounced dead at the scene.",
      source: {
        id: "src_kingston_3406_tps_homicide_2020",
        title: "Victim Stephon KELLY",
        url: "https://www.tps.ca/organizational-chart/specialized-operations-command/detective-operations/investigative-services/homicide/case/6/2020/",
        publishedAt: "2020-01-25"
      }
    }
  },
  {
    property: {
      id: "prop_lawrence_e_3945",
      address: "3945 Lawrence Avenue East",
      city: "Toronto",
      province: "ON",
      neighborhood: "Woburn",
      latitude: 43.7630075,
      longitude: -79.20395,
      propertyType: PropertyType.Apartment,
      useType: UseType.Residential,
      viewPrecision: ViewPrecision.building_only
    },
    incident: {
      id: "inc_lawrence_e_3945_homicide_2021",
      title: "Reported homicide investigation",
      incidentDate: "2021-11-16",
      incidentYear: 2021,
      publicSummary:
        "Toronto Police Service records state that police responded to a drive-by shooting at 3945 Lawrence Avenue East on November 16, 2021, where a man was found outside and pronounced dead at the scene.",
      source: {
        id: "src_lawrence_e_3945_tps_homicide_2021",
        title: "Victim Abdulmoaize POPAL",
        url: "https://www.tps.ca/organizational-chart/specialized-operations-command/detective-operations/investigative-services/homicide/case/77/2021/",
        publishedAt: "2021-11-16"
      }
    }
  }
];

async function upsertRecord(record: TpsHomicideRecord, createdById?: string) {
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
      mainCategory: MainCategory.PublicSafety,
      category: IncidentCategory.Homicide,
      incidentDate: new Date(record.incident.incidentDate),
      incidentYear: record.incident.incidentYear,
      publicSummary: record.incident.publicSummary,
      internalNotes: "Public-source research batch: Toronto Police Service homicide records.",
      status: RecordStatus.Approved,
      sensitive: true,
      reportAllowed: true,
      supernatural: false,
      createdById: createdById ?? null
    },
    create: {
      id: record.incident.id,
      propertyId: record.property.id,
      title: record.incident.title,
      mainCategory: MainCategory.PublicSafety,
      category: IncidentCategory.Homicide,
      incidentDate: new Date(record.incident.incidentDate),
      incidentYear: record.incident.incidentYear,
      publicSummary: record.incident.publicSummary,
      internalNotes: "Public-source research batch: Toronto Police Service homicide records.",
      status: RecordStatus.Approved,
      sensitive: true,
      reportAllowed: true,
      supernatural: false,
      createdById: createdById ?? null
    }
  });

  await prisma.source.upsert({
    where: { id: record.incident.source.id },
    update: {
      incidentId: record.incident.id,
      title: record.incident.source.title,
      name: "Toronto Police Service",
      url: record.incident.source.url,
      publishedAt: new Date(record.incident.source.publishedAt),
      retrievedAt: new Date("2026-05-10")
    },
    create: {
      id: record.incident.source.id,
      incidentId: record.incident.id,
      title: record.incident.source.title,
      name: "Toronto Police Service",
      url: record.incident.source.url,
      publishedAt: new Date(record.incident.source.publishedAt),
      retrievedAt: new Date("2026-05-10")
    }
  });
}

async function main() {
  const admin = await prisma.user.findUnique({ where: { email: "admin@propertychronicle.local" } });

  for (const record of records) {
    await upsertRecord(record, admin?.id);
  }

  await prisma.auditLog.create({
    data: {
      userId: admin?.id,
      action: "research_batch_upsert",
      entityType: "research_batch",
      entityId: "toronto_tps_homicides_2026_05_10",
      metadata: {
        area: "Toronto official-source homicide expansion",
        recordCount: records.length,
        sourceMode: "Toronto Police Service public homicide pages"
      }
    }
  });

  console.log(`Upserted ${records.length} Toronto TPS homicide records.`);
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
