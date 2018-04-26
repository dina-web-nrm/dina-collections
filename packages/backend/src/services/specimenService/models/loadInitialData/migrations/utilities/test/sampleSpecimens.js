/* eslint-disable sort-keys */

module.exports = [
  {
    catalogNumber: 100001,
    analysis: {
      AccessionNo: 100001,
    },
    collection: {
      AccessionNo: 100001,
      OldSkeletonNo: '4',
      OldSkinNo: '4',
      SkeletonCollection: 10,
      SkeletonCollection_related: {
        ID: 10,
        NRM_Location: 'Spritsamling',
        Type: 'Both',
        Location_Eng: 'Alcohol Collection',
      },
      SkeletonStatus: '8',
      SkeletonStatus_related: {
        ID: '8',
        Skelett: 'I sprit (även om det är helt ex.)',
        Skel_Eng: 'In alcohol',
      },
      SkinCollection: 10,
      SkinCollection_related: {
        ID: 10,
        NRM_Location: 'Spritsamling',
        Type: 'Both',
        Location_Eng: 'Alcohol Collection',
      },
      SkinStatus: '8',
      SkinStatus_related: {
        ID: '8',
        Skinn: 'I sprit',
        Skin_Eng: 'In alcohol',
      },
      Skin_Skel_Remarks: '5 ex',
    },
    objects: {
      AccessionNo: 100001,
      Coll_Year: 1845, // collectedYear
      // remarks related to collectionInformtin
      Comments:
        '5 ex. OBS Det finns 2 Odensjö i Småland så det är minst lika troligt att dessa kommer från det utanför Växjö istället.',
      Date_Type: 0,
      Family: 'Vespertilionidae',
      FieldNo: 879,
      FieldNo_related: {
        FieldNo: 879,
        Continent_Ocean: 'Europe',
        Nation: 'Sweden',
        Province: 'Småland', // add to place
        Locality: 'Odensjö', // add to locationInformation (localityN)
        Lat_DD: 57.7114, // add to position
        Long_DD: 14.1769, // add to position
        // add to locationInformation
        LocationRemarks:
          'Obs! Finns ytterligare ett Odensjö utanför Växjö, så djur som har denna lokal kan ha fel koordinat',
        LastModifiedBy: 'PNS', // add to specimenSystemHistory
        LastModifiedDate: '2017-02-14', // add to specimenSystemHistory (add some kind of system context)
      },
      Genus: 'Eptesicus', // later
      LastModifiedBy: 'PNS', // add to specimenSystemHistory
      LopId: 53525, // ignore
      ModifiedDate: '2016-12-06', // add to specimenSystemHistory
      OldScientificName: 'Vesperugo nilssoni',
      Order: 'Chiroptera',
      Publish_Coord: 'Y', // if any true publish true
      Publish_Record: 'Y', // if any true publish true
      RegDate: '2016-12-06', // add to specimenSystemHistory
      RubinNo: 3815551, // ignore
      Scientific_Name: 'Eptesicus nilssonii', // later
      Signature: 'PNS', // add to specimenSystemHistory for regDate
      Species: 'nilssonii', // ignore
      StatedLocality: 'Odensjö, Småland', // add to locationInformation (localotiT)
    },
  },
  {
    catalogNumber: 100002,
    analysis: {
      AccessionNo: 100002,
    },
    collection: {
      AccessionNo: 100002,
      Ethanol: 'yes',
      SkeletonStatus: '8',
      SkeletonStatus_related: {
        ID: '8',
        Skelett: 'I sprit (även om det är helt ex.)',
        Skel_Eng: 'In alcohol',
      },
      SkinCollection: 10,
      SkinCollection_related: {
        ID: 10,
        NRM_Location: 'Spritsamling',
        Type: 'Both',
        Location_Eng: 'Alcohol Collection',
      },
      SkinStatus: '8',
      SkinStatus_related: {
        ID: '8',
        Skinn: 'I sprit',
        Skin_Eng: 'In alcohol',
      },
    },
    objects: {
      AccessionNo: 100002,
      Coll_Day: 21,
      Coll_Month: 7,
      Coll_Year: 1905,
      'Collector(Leg)': 'Söderberg, R.',
      Date_Type: 0,
      Family: 'Vespertilionidae',
      FieldNo: 4292,
      FieldNo_related: {
        FieldNo: 4292,
        Continent_Ocean: 'Europe',
        Nation: 'Sweden',
        Province: 'Västergötland',
        Locality: 'Hornborgasjön',
        Lat_DD: 58.3112475151,
        Long_DD: 13.5473725009,
        Locational_Accuracy: 3500.0,
        LastModifiedBy: 'RUB',
        LastModifiedDate: '2007-05-30',
        RubinID: 'GZ018251',
      },
      Genus: 'Eptesicus',
      LastModifiedBy: 'PNS',
      LopId: 53469,
      ModifiedDate: '2016-11-08',
      Order: 'Chiroptera',
      Publish_Coord: 'Y',
      Publish_Record: 'Y',
      RegDate: '2016-11-08',
      RubinNo: 3815551,
      Scientific_Name: 'Eptesicus nilssonii',
      Signature: 'PNS',
      Species: 'nilssonii',
      StatedLocality: 'Hornborgasjön',
    },
  },
  {
    catalogNumber: 100003,
    analysis: {
      AccessionNo: 100003,
    },
    collection: {
      AccessionNo: 100003,
      Ethanol: 'yes',
      SkeletonCollection: 10,
      SkeletonCollection_related: {
        ID: 10,
        NRM_Location: 'Spritsamling',
        Type: 'Both',
        Location_Eng: 'Alcohol Collection',
      },
      SkeletonStatus: '8',
      SkeletonStatus_related: {
        ID: '8',
        Skelett: 'I sprit (även om det är helt ex.)',
        Skel_Eng: 'In alcohol',
      },
      SkinCollection: 10,
      SkinCollection_related: {
        ID: 10,
        NRM_Location: 'Spritsamling',
        Type: 'Both',
        Location_Eng: 'Alcohol Collection',
      },
      SkinStatus: '8',
      SkinStatus_related: {
        ID: '8',
        Skinn: 'I sprit',
        Skin_Eng: 'In alcohol',
      },
    },
    objects: {
      AccessionNo: 100003,
      Coll_Year: 1847,
      'Collector(Leg)': 'von Wright, Wilhelm',
      Date_Type: 0,
      Family: 'Vespertilionidae',
      FieldNo: 601,
      FieldNo_related: {
        FieldNo: 601,
        Continent_Ocean: 'Europe',
        Nation: 'Sweden',
        Province: 'Bohuslän',
        Locality: 'Orust, Torebo',
        Lat_DD: 58.2073,
        Long_DD: 11.5652,
        LastModifiedDate: '2007-03-02',
      },
      Genus: 'Eptesicus',
      LastModifiedBy: 'PNS',
      LopId: 53470,
      ModifiedDate: '2016-11-08',
      Order: 'Chiroptera',
      Publish_Coord: 'Y',
      Publish_Record: 'Y',
      RegDate: '2016-11-08',
      RubinNo: 3815551,
      Scientific_Name: 'Eptesicus nilssonii',
      Signature: 'PNS',
      Species: 'nilssonii',
      StatedLocality: 'Torebo, Orust',
    },
  },
]
