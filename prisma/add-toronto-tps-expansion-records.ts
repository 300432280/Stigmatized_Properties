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

type OfficialRecord = {
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

const records: OfficialRecord[] = [
  {
    property: {
      id: "prop_mount_olive_23",
      address: "23 Mount Olive Drive",
      city: "Toronto",
      province: "ON",
      neighborhood: "Mount Olive-Silverstone-Jamestown",
      latitude: 43.746091,
      longitude: -79.5871228,
      propertyType: PropertyType.Apartment,
      useType: UseType.Residential,
      viewPrecision: ViewPrecision.building_only
    },
    incident: {
      id: "inc_mount_olive_23_homicide_2020",
      title: "Reported homicide investigation",
      incidentDate: "2020-09-27",
      incidentYear: 2020,
      publicSummary:
        "Toronto Police Service records state that police responded to a shooting call at 23 Mount Olive Drive on September 27, 2020, where a victim was found in a hallway with gunshot wounds and pronounced dead at the scene.",
      source: {
        id: "src_mount_olive_23_tps_homicide_2020",
        title: "Victim Josephate MARTELLY",
        url: "https://www.tps.ca/organizational-chart/specialized-operations-command/detective-operations/investigative-services/homicide/case/55/2020/",
        publishedAt: "2020-09-27"
      }
    }
  },
  {
    property: {
      id: "prop_stilecroft_11",
      address: "11 Stilecroft Drive",
      city: "Toronto",
      province: "ON",
      neighborhood: "York University Heights",
      latitude: 43.751143,
      longitude: -79.4902743,
      propertyType: PropertyType.PublicSpace,
      useType: UseType.PublicInstitutional,
      viewPrecision: ViewPrecision.building_only
    },
    incident: {
      id: "inc_stilecroft_11_homicide_2020",
      title: "Reported homicide investigation",
      incidentDate: "2020-09-02",
      incidentYear: 2020,
      publicSummary:
        "Toronto Police Service records state that police responded to a shooting call at 11 Stilecroft Drive on September 2, 2020, where a man was found in a vehicle in medical distress and later died in hospital.",
      source: {
        id: "src_stilecroft_11_tps_homicide_2020",
        title: "Victim Joseph HART",
        url: "https://www.tps.ca/organizational-chart/specialized-operations-command/detective-operations/investigative-services/homicide/case/47/2020/",
        publishedAt: "2020-09-02"
      }
    }
  },
  {
    property: {
      id: "prop_victoria_park_2743",
      address: "2743 Victoria Park Avenue",
      city: "Toronto",
      province: "ON",
      neighborhood: "L'Amoreaux",
      latitude: 43.7793135,
      longitude: -79.3234233,
      propertyType: PropertyType.Apartment,
      useType: UseType.Residential,
      viewPrecision: ViewPrecision.building_only
    },
    incident: {
      id: "inc_victoria_park_2743_homicide_2020",
      title: "Reported homicide investigation",
      incidentDate: "2020-05-17",
      incidentYear: 2020,
      publicSummary:
        "Toronto Police Service records state that police responded to a shooting at 2743 Victoria Park Avenue on May 17, 2020, and located a victim in an apartment within the complex who later died in hospital.",
      source: {
        id: "src_victoria_park_2743_tps_homicide_2020",
        title: "Victim Shawn WILLIAMS",
        url: "https://www.tps.ca/organizational-chart/specialized-operations-command/detective-operations/investigative-services/homicide/case/28/2020/",
        publishedAt: "2020-05-17"
      }
    }
  },
  {
    property: {
      id: "prop_king_w_647",
      address: "647 King Street West",
      city: "Toronto",
      province: "ON",
      neighborhood: "Wellington Place",
      latitude: 43.6441107,
      longitude: -79.4017514,
      propertyType: PropertyType.Commercial,
      useType: UseType.Commercial,
      viewPrecision: ViewPrecision.building_only
    },
    incident: {
      id: "inc_king_w_647_homicide_2022",
      title: "Reported homicide investigation",
      incidentDate: "2022-07-17",
      incidentYear: 2022,
      publicSummary:
        "Toronto Police Service records state that officers responded to reports of a shooting at 647 King Street West on July 17, 2022, where two people were found shot inside a nightclub and one later died in hospital.",
      source: {
        id: "src_king_w_647_tps_homicide_2022",
        title: "Most Wanted - Abdirahman JIMALE / Homicide #39/2022",
        url: "https://www.tps.ca/organizational-chart/specialized-operations-command/detective-operations/investigative-services/homicide/case/39/2022/",
        publishedAt: "2022-07-17"
      }
    }
  },
  {
    property: {
      id: "prop_keele_3585",
      address: "3585 Keele Street",
      city: "Toronto",
      province: "ON",
      neighborhood: "York University Heights",
      latitude: 43.7497289,
      longitude: -79.4874346,
      propertyType: PropertyType.Commercial,
      useType: UseType.Commercial,
      viewPrecision: ViewPrecision.building_only
    },
    incident: {
      id: "inc_keele_3585_homicide_2021",
      title: "Reported homicide investigation",
      incidentDate: "2021-10-16",
      incidentYear: 2021,
      publicSummary:
        "Toronto Police Service records state that police responded to a shooting call at 3585 Keele Street on October 16, 2021, where a man was located in a vehicle in a parking lot and pronounced dead at the scene.",
      source: {
        id: "src_keele_3585_tps_homicide_2021",
        title: "Victim Randy NGUYEN",
        url: "https://www.tps.ca/organizational-chart/specialized-operations-command/detective-operations/investigative-services/homicide/case/66/2021/",
        publishedAt: "2021-10-16"
      }
    }
  },
  {
    property: {
      id: "prop_st_clair_w_2525",
      address: "2525 St. Clair Avenue West",
      city: "Toronto",
      province: "ON",
      neighborhood: "Rockcliffe-Smythe",
      latitude: 43.667987,
      longitude: -79.484753,
      propertyType: PropertyType.Commercial,
      useType: UseType.Commercial,
      viewPrecision: ViewPrecision.building_only
    },
    incident: {
      id: "inc_st_clair_w_2525_homicide_2020",
      title: "Reported homicide investigation",
      incidentDate: "2020-09-10",
      incidentYear: 2020,
      publicSummary:
        "Toronto Police Service records state that police responded to a shooting call in the Walmart parking lot at 2525 St. Clair Avenue West on September 10, 2020, where a victim was found in a vehicle and pronounced deceased.",
      source: {
        id: "src_st_clair_w_2525_tps_homicide_2020",
        title: "Most Wanted - Abdelmuniem ABDALLA / Homicide #49/2020",
        url: "https://www.tps.ca/organizational-chart/specialized-operations-command/detective-operations/investigative-services/homicide/case/49/2020/",
        publishedAt: "2020-09-10"
      }
    }
  },
  {
    property: {
      id: "prop_glamorgan_5",
      address: "5 Glamorgan Avenue",
      city: "Toronto",
      province: "ON",
      neighborhood: "Dorset Park",
      latitude: 43.768432,
      longitude: -79.2836321,
      propertyType: PropertyType.Apartment,
      useType: UseType.Residential,
      viewPrecision: ViewPrecision.building_only
    },
    incident: {
      id: "inc_glamorgan_5_homicide_2023",
      title: "Reported homicide investigation",
      incidentDate: "2023-12-10",
      incidentYear: 2023,
      publicSummary:
        "Toronto Police Service records state that police responded to an unknown-trouble call at 5 Glamorgan Avenue on December 10, 2023, where two children were located without vital signs inside an apartment unit and later pronounced deceased.",
      source: {
        id: "src_glamorgan_5_tps_homicide_2023",
        title: "Victim Dimitri COLLIAS",
        url: "https://www.tps.ca/organizational-chart/specialized-operations-command/detective-operations/investigative-services/homicide/case/68/2023/",
        publishedAt: "2023-12-10"
      }
    }
  },
  {
    property: {
      id: "prop_clearview_81",
      address: "79-83 Clearview Heights",
      city: "Toronto",
      province: "ON",
      neighborhood: "Beechborough-Greenbrook",
      latitude: 43.6924355,
      longitude: -79.4827118,
      propertyType: PropertyType.Apartment,
      useType: UseType.Residential,
      viewPrecision: ViewPrecision.building_only
    },
    incident: {
      id: "inc_clearview_81_homicide_2021",
      title: "Reported homicide investigation",
      incidentDate: "2021-06-13",
      incidentYear: 2021,
      publicSummary:
        "Toronto Police Service records state that a victim attended a party at the rear of 79, 81, and 83 Clearview Heights on June 13, 2021, then was shot after walking toward the street and pronounced deceased at the scene.",
      source: {
        id: "src_clearview_81_tps_homicide_2021",
        title: "Victim Brendon DALEY",
        url: "https://www.tps.ca/organizational-chart/specialized-operations-command/detective-operations/investigative-services/homicide/case/28/2021/",
        publishedAt: "2021-06-13"
      }
    }
  }
];

async function upsertRecord(record: OfficialRecord, createdById?: string) {
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
      internalNotes: "Public-source research batch: Toronto Police Service larger testing expansion.",
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
      internalNotes: "Public-source research batch: Toronto Police Service larger testing expansion.",
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
      entityId: "toronto_tps_expansion_2026_05_10",
      metadata: {
        area: "Toronto broader test-density expansion",
        recordCount: records.length,
        sourceMode: "Toronto Police Service public homicide pages"
      }
    }
  });

  console.log(`Upserted ${records.length} Toronto TPS expansion records.`);
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
