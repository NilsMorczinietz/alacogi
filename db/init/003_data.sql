INSERT INTO
  "groups" (id, "name")
VALUES
  (60459, 'LZ1');

INSERT INTO
  vehicles (id, "name", fullname, shortname, issi)
VALUES
  (
    80322,
    'MNH_01_HLF20_02',
    'Löschgruppenfahrzeug',
    'LF',
    '4437166'
  ),
  (
    80323,
    'MNH_01_HLF20_03',
    'Löschgruppenfahrzeug',
    'LF',
    '8332915'
  ),
  (
    80324,
    'MNH_01_LF20KatS_04',
    'Löschgruppenfahrzeug',
    'LF',
    '6439011'
  );

INSERT INTO
  answer_codes (id, label)
VALUES
  (42470, 'Nicht verfügbar'),
  (48176, '30 Minuten'),
  (48177, 'Einsatzbereit'),
  (42469, 'Aus'),
  (42467, '5 Minuten');

-- 1 Stufenbasierte Einsatzstichwörter
-- 1.1 Brandschutz (Eskalationsstufen) 
INSERT INTO
  alarm_keywords (keyword, description)
VALUES
  (
    'BMA',
    'BMA-Einsätze durch Gefahrenmeldeanlagen nach DIN (Brand), auch BMA-Meldung über Wachdienste.'
  ),
  (
    'F0',
    'Definitiv gelöschter Brand, keine Gefährdung, Feuerwehr nur zur Kontrolle, Brandstellennachschau nach Feuerwehreinsätzen.'
  ),
  (
    'F1',
    'Kleinstbrand oder Brandgeruch außerhalb von Gebäuden ohne Objektgefährdung.'
  ),
  (
    'F2',
    'Brand außerhalb von Gebäuden ohne Objektgefährdung, freistehende Photovoltaikanlagen (-Parks) oder Einsatzstufenerhöhung nach F2.'
  ),
  ('F3', 'Einsatzstufenerhöhung nach F3.'),
  ('F4', 'Einsatzstufenerhöhung nach F4.'),
  ('F5', 'Einsatzstufenerhöhung nach F5.'),
  -- 1.1.1 Brandschutz Gebäude / Industrie
  (
    'F1_Gebäude',
    'Rauchwarnmelder ohne Schadensmerkmale oder Brand einer Gartenhütte/Gartensauna.'
  ),
  (
    'F2_Gebäude',
    'Kleinstbrand außerhalb von Gebäuden mit Objektgefährdung.  Brandgeruch innerhalb von Gebäuden oder Rauchentwicklung / Brand innerhalb von einem Gebäude beschränkt auf eine Nutzungseinheit (Wohnung oder Kleingewerbe).'
  ),
  (
    'F3_Gebäude',
    'Brandgeruch / Rauchentwicklung / Brand - In einem Gebäude im Dachgeschoss oder im Dachbereich. - In mehreren Nutzungseinheiten eines Gebäudes. - Innerhalb von einem Gebäude nach Sonderbauverordnung (Versammlungsstätten, Beherbergungsstätten, Verkaufsstätten, Groß-/Tiefgaragen).'
  ),
  (
    'F4_Gebäude',
    'Brandgeruch / Rauchentwicklung / Brand in einem Gebäude zur Behandlung, Pflege oder Unterbringung von Personen in größerer Anzahl.'
  ),
  -- 1.1.2 Brandschutz Verkehr (Fahrzeuge / Verkehrsbereiche)
  (
    'F1_Vekehr',
    'Brandgeruch, Rauchentwicklung oder Brand an Kraftfahrzeugen bis 3,5 Tonnen oder Anhänger auf Frei- / Verkehrsflächen. '
  ),
  (
    'F2_Verkehr',
    'Brandgeruch, Rauchentwicklung oder Brand an Kraftfahrzeugen über 3,5 Tonnen, Bus, LKW oder LKW-Anhänger auf Frei- / Verkehrsflächen. Brand oder Unfall eines Heißluftballons.'
  ),
  (
    'F3_Verkehr',
    'Brandgeruch / Rauchentwicklung / Brand - An Fahrzeugen mit Tankbehälter - An Tankstellen / Betankungseinrichtung für Kraftstoffe - An Bahnfahrzeugen jeglicher Art, Unfall oder Brand von Kleinluftfahrzeugen.'
  ),
  (
    'F4_Verkehr',
    'Unfall oder Brand von Luftfahrzeugen.'
  ),
  -- 1.1.3 Brandschutz Vegetation
  (
    'F1_Vegetation',
    'Rauchentwicklung / Brand von Vegetation beschränkt auf eine Fläche (< 100 m²) oder geringe Anzahl von Gewächsen.'
  ),
  (
    'F2_Vegetation',
    'Rauchentwicklung / Brand von Vegetation auf eine Fläche (> 100 m²), in einem Waldgebiet auf einer Fläche < 1000 m².'
  ),
  (
    'F3_Vegetation',
    'Rauchentwicklung / Brand von Vegetation an Bahnanlagen.'
  ),
  (
    'F4_Vegetation',
    'Rauchentwicklung / Brand von Vegetation in einem Waldgebiet auf einer Fläche > 1000 m².'
  ),
  -- 1.1.4 Brandschutz Sonderlage
  (
    'F1_Boot ',
    'Brandgeruch, Rauchentwicklung oder Brand auf Booten (kleiner 12m) auf Wasserflächen.'
  ),
  ('F2_Explosion', NULL),
  ('F4_Explosion', NULL),
  (
    'F4_Schiff',
    'Brandgeruch, Rauchentwicklung oder Brand Schiffen (größer 12m) auf Wasserflächen.'
  );

-- 1.2 Technische Hilfeleistung
INSERT INTO
  alarm_keywords (keyword, description)
VALUES
  -- 1.2.1 Allgemein
  (
    'TH0',
    'Sonstige Klein-/Arbeitseinsätze als Hilfeleistung der Feuerwehr.'
  ),
  (
    'TH1',
    'Klein- / Arbeitseinsätze als Hilfeleistung, bei der höchste Eile geboten ist.'
  ),
  ('TH2', 'Einsatzstufenerhöhung nach TH2.'),
  ('TH3', 'Einsatzstufenerhöhung nach TH3.'),
  ('TH4', 'Einsatzstufenerhöhung nach TH4.'),
  ('TH5', 'Einsatzstufenerhöhung nach TH5.'),
  -- 1.2.2 Person in Gefahr
  (
    'TH1_P_Notlage',
    'Medizinischer Notfall oder drohender einzutretender medizinischer Notfall bei eingeschlossenen Personen in KFZ ohne Unfallbeteiligung oder in einem Aufzug. Eingeklemmte Person in Klettergerüst oder Zaun. (Ausstattung HLF ausreichend, sonst TH2_P_klemmt). Meldung eines Sturzereignis durch ein mobiles Endgerät (Smartwatch).'
  ),
  (
    'TH1_P_Tür',
    'Verletzte / Erkrankte Person hinter verschlossener Tür.'
  ),
  (
    'TH1_P-Strom',
    'Person an Strom, stromführendes Teil, Stromleitung.'
  ),
  (
    'TH2_P_Höhe',
    'Höhenrettung, Person droht abzustürzen oder zu springen, Hochbauunfall.'
  ),
  (
    'TH2_P_Tiefe',
    'Tiefbauunfall, Person in Gefahr durch Verschüttung, Absturz in Kanal, Schacht, Grube oder Steinbruch.'
  ),
  (
    'TH2_P_Wasser',
    'Eisunfall, Tauchunfall, Person in Gewässer, Menschenrettung aus allen Gewässern.'
  ),
  (
    'TH2_P_Klemmt',
    'Person teil-/ eingeklemmt nach Unfall mit KFZ, Maschine, Tier oder ähnlichem.'
  ),
  (
    'TH3_P_Zug',
    'Person unter Zug oder überrollt durch Zug.'
  ),
  ('TH4_P_Rhein', 'Person im Rhein.'),
  -- 1.2.3 Sturmschaden
  (
    'TH0_Sturm',
    'Sturm-/ Windschaden bei dem eine Gefährdung von Menschen oder Sachwerten ausgeschlossen werden kann und die Feuerwehr im Rahmen der Hilfeleistung zum Einsatz kommt.'
  ),
  (
    'TH1_Sturm',
    'Sturm-/ Windschaden bei dem eine Gefährdung von Menschen oder Sachwerten eingetreten ist oder nicht ausgeschlossen werden kann und höchste Eile geboten ist.'
  ),
  -- 1.2.4 Hilfeleistung Tier
  (
    'TH0_TierTrans',
    'Transport von Kleintieren zum Tierarzt / Tierheim.'
  ),
  (
    'TH0_Tier',
    'Beseitigung eines Tierkadavers von öffentlichen Verkehrsflächen.'
  ),
  (
    'TH1_Tier_kl',
    'Rettung von Kleintieren bis Größe eines Hundes (< Bernhardiner) aus misslichen Lagen (z.B. Katze im Baum oder auf dem Dach).'
  ),
  (
    'TH1_Tier_gr',
    'Rettung von Großtieren aus gefährlichen Situationen wie z.B. in Gülleloch gestürzt oder eine Weide heruntergestürzt. Definition Großtier: Tiere, welche man nicht mit zwei Händen tragen kann (> Bernhardiner).'
  ),
  -- 1.2.5 Sonderlage
  (
    'TH3_Einsturz',
    'Einsturz von Gebäudeteilen, unabhängig ob Personen eingeklemmt sind.'
  ),
  (
    'TH4_Schiff',
    'Technische Hilfeleistung auf Schiffen.'
  );

-- 1.3 Atomare / Biologische / Chemische Gefahren
INSERT INTO
  alarm_keywords (keyword, description)
VALUES
  (
    'ABC0',
    'Unklarer ABC-Einsatz ohne Gefährdung von Personen, Umwelt oder Sachwerten. Nicht näher spezifizierbare Gewässerverschmutzung.'
  ),
  (
    'ABC1',
    'Unklarer ABC-Einsatz, eine Gefährdung kann nicht ausgeschlossen werden. Meist im Freigelände oder Verkehrsraum.'
  ),
  (
    'ABC2',
    'Verdacht des Austritts oder Austritt von Gasen jeglicher Art (außer Gasflasche im Freigelände).'
  ),
  ('ABC3', 'Einsatzstufenerhöhung nach ABC3.'),
  (
    'ABC4',
    'Verdacht des Austritts oder Austritt von atomaren, biologischen oder chemischen Stoffen jeglicher Art und Ort.'
  ),
  ('ABC5', 'Einsatzstufenerhöhung nach ABC5.'),
  (
    'ABC0_Öl',
    'Ölspur oder Straßenverunreinigungen (z.B. Lehm, Schutt) ohne Gefährdung.'
  ),
  (
    'ABC1_Öl',
    'Ölaustritt < 100 Liter oder Straßenverunreinigung mit möglicher Gefährdung.'
  ),
  ('ABC2_Öl', 'Ölaustritt > 100 Liter.'),
  (
    'ABC4_Schiff',
    'Gefahrstofffreisetzung auf Schiffen: atomare, biologische, chemische Stoffe oder Güter.'
  );

-- 2 Szenario basierte Einsatzstichwörter
-- 2.1 Notfallrettung
INSERT INTO
  alarm_keywords (keyword, description)
VALUES
  -- 2.1.1 RD ohne NA
  (
    'RD0',
    'Dringlicher RTW-Einsatz ohne Sonderrechte.'
  ),
  (
    'RD1',
    'RTW-Notfallrettung mit Sonder- und Wegerechten.'
  ),
  (
    'RD_VU',
    'Verkehrsunfall mit Pkw, Motorrad, Fahrrad, E-Roller.'
  ),
  -- 2.1.2 RD mit NA
  ('NA', 'RTW + NEF/RTH-Einsatz mit Sonderrechten.'),
  (
    'NA_VU',
    'Schwerer Verkehrsunfall mit 1-2 Verletzten (z.B. Einklemmung, Überrolltrauma).'
  ),
  (
    'NA_Ü',
    'Notarzt außerhalb des Kreisgebietes auf Anforderung anderer Leitstelle.'
  ),
  -- 2.1.3 NA-Einsätze nach ManV-Konzept
  (
    'NA_3',
    'Einsatz mit bis zu 2 Rot oder 3 Gelb Patienten.'
  ),
  (
    'NA_3_VU',
    'Verkehrsunfall mit bis zu 2 Rot oder 3 Gelb Patienten.'
  ),
  (
    'NA_5',
    'Einsatz mit bis zu 3 Rot oder 5 Gelb Patienten.'
  ),
  (
    'NA_5_VU',
    'Verkehrsunfall mit bis zu 3 Rot oder 5 Gelb Patienten.'
  ),
  (
    'NA_10',
    'Einsatz mit bis zu 5 Rot oder 10 Gelb Patienten.'
  ),
  (
    'NA_20',
    'Einsatz mit bis zu 10 Rot oder 20 Gelb Patienten.'
  ),
  (
    'NA_30',
    'Einsatz mit bis zu 15 Rot oder 30 Gelb Patienten.'
  ),
  (
    'MANV',
    'Einsatz mit bis zu 50 Patienten nach Landeskonzept (BHP 50).'
  ),
  -- 2.1.4 Sonderlage RD
  (
    'Sonder_JVA',
    'Einsatz in JVA Düsseldorf (gesicherter Bereich).'
  );

-- 2.2 Krankentransport und Verlegungen
INSERT INTO
  alarm_keywords (keyword, description)
VALUES
  (
    'KT',
    'Krankentransport sitzend/liegend, nicht zeitkritisch.'
  ),
  (
    'KT_Inf',
    'Infektionstransport (sitzend/liegend).'
  ),
  (
    'KT_Termin',
    'Krankentransport mit festem Termin.'
  ),
  (
    'KT_Zwang',
    'Krankentransport unter PsychKG-Richtlinien.'
  ),
  (
    'KT_Werkstatt',
    'Werkstattüberführung, Dienstfahrt, Personalausfall.'
  ),
  (
    'KT_Schwer',
    'Transport schwergewichtiger Patienten mit Sonderfahrzeug.'
  );

-- 2.3 Sonderlagen
INSERT INTO
  alarm_keywords (keyword, description)
VALUES
  (
    'Amokdroh',
    'Amokdrohung, Anschlag mit Waffen oder Sprengsätzen gegen größere Personengruppen.'
  ),
  (
    'Amoktat',
    'Amoktat mit Schusswaffen/Sprengstoff, Verletzte oder Tote.'
  ),
  (
    'Amtshilfe',
    'Anforderung der Feuerwehr im Rahmen der Amtshilfe.'
  ),
  (
    'Bedrohung',
    'Bedrohung oder Waffengebrauch ohne Gefährdung größerer Gruppen (z.B. Wohnung).'
  ),
  (
    'Bomendroh',
    'Bombendrohung mittels Sprengmittel.'
  ),
  (
    'Führung',
    'Führungsalarm der Feuerwehr bei Sonderlagen.'
  ),
  ('Landessicherung', 'Landesicherung für RTH.'),
  (
    'PSNV-E',
    'Psychosoziale Notfallversorgung Einsatzkräfte Kreis Mettmann.'
  ),
  ('MunFund', 'Kampfmittelfund (z.B. Fliegerbombe).'),
  (
    'Notrufausfall',
    'Ausfall von Festnetz/Mobilfunk oder Stromversorgung.'
  ),
  (
    'Pol_Zugriff',
    'Polizeilicher Zugriff mit Anforderung Feuerwehr/Rettungsdienst.'
  ),
  ('SOS', 'Notfall bei Einsatzpersonal selbst.'),
  ('Stromausfall', 'Flächendeckender Stromausfall.'),
  (
    'Unwetter',
    'Unwetterlage mit vielen Einsatzstellen.'
  ),
  (
    'Wache_besetzen',
    'Wachbesetzung (eigene oder fremde Wache).'
  ),
  (
    'Warnung_Bevölkerung',
    'Warnung der Bevölkerung im Stadtgebiet.'
  );

-- 2.4 Dokumentation
INSERT INTO
  alarm_keywords (keyword, description)
VALUES
  (
    'SanDie',
    'Einsatz zur Mitführung Sanitätsdienstveranstaltung Hilfsorganisation.'
  ),
  (
    'BraSiWa',
    'Brandsicherheitswache, Brauchtumsfeuer, Beteiligung Feuerwehr.'
  );

-- 2.5 Störfallverordnung
INSERT INTO
  alarm_keywords (keyword, description)
VALUES
  ('D1-Fackeltätigkeit', 'Fackeltätigkeit.'),
  (
    'D1-Meldung',
    'Ereignis ohne Auswirkung außerhalb Werk, aber wahrnehmbar.'
  ),
  (
    'D2-Meldung',
    'Auswirkungen außerhalb nicht auszuschließen, erste Maßnahmen nötig.'
  ),
  (
    'D3-Meldung',
    'Gefährdung außerhalb wahrscheinlich oder gegeben.'
  ),
  (
    'D4-Meldung',
    'Schwerer D3-Fall oder Katastrophenfall (BHKG).'
  );

-- 2.6 Leitstelle
INSERT INTO
  alarm_keywords (keyword, description)
VALUES
  (
    'Ausfall_Notruf_BF-LEV',
    'Ausfall Notrufleitung BF Leverkusen.'
  ),
  (
    'Ausfall_Notruf_KLTS-ME',
    'Ausfall Notrufleitung Kreisleitstelle Mettmann.'
  ),
  (
    'BMA_Rückstellung',
    'Technische Rückstellung der Brandmeldeanlage im System.'
  ),
  (
    'BAO_1',
    'Besondere Aufbauorganisation Leitstelle Stufe 1.'
  ),
  (
    'BAO_2',
    'Besondere Aufbauorganisation Leitstelle Stufe 2.'
  ),
  (
    'BAO_3',
    'Besondere Aufbauorganisation Leitstelle Stufe 3.'
  ),
  (
    'BAO_RD',
    'Besondere Aufbauorganisation Leitstelle Rettungsdienst.'
  ),
  (
    'Krisenstab',
    'Alarmierung Krisenstab Kreis Mettmann.'
  ),
  (
    'Leitstelle_intern',
    'Interne Arbeiten Leitstelle ohne FW/RD.'
  ),
  (
    'Notrufvermittlung',
    'Weitervermittlung an Polizei/Leitstelle mangels Zuständigkeit.'
  ),
  (
    'Vermittlung_116117',
    'Weitervermittlung an KV-Notdienst/Hausarzt.'
  ),
  (
    'Vermittlung_Amt',
    'Weitervermittlung an Ämter (z.B. Ordnungsamt, Gesundheitsamt).'
  ),
  ('Störung_LTS', 'Störungen in Leitstelle/Technik.');

-- 2.7 Hochwasserschutz (BRW)
INSERT INTO
  alarm_keywords (keyword, description)
VALUES
  (
    'BRW_Warn_1',
    'Voralarm – Kontrolle/Beobachtung, evtl. Warnung vorbereiten.'
  ),
  (
    'BRW_Warn_2',
    'Gefahr – Warnung, Evakuierung vorbereiten, AGAP-Maßnahmen umsetzen.'
  ),
  (
    'BRW_Warn_3',
    'Extreme Gefahr – Evakuierung abschließen, höchste Warnstufe.'
  );

-- 2.8 Konzepte nach Landes- / Bundes- / EU-Vorgaben
INSERT INTO
  alarm_keywords (keyword, description)
VALUES
  -- 2.8.1 VÜH-NRW
  (
    'Bereitschaft_4_Vorlauf',
    'Vorgeplanter Einsatz Bezirksbereitschaft 4.'
  ),
  (
    'Bereitschaft_4_Sofort',
    'Sofortiger Einsatz Bezirksbereitschaft 4.'
  ),
  -- 2.8.2 ABC-Schutzkonzept NRW
  (
    'Ü-ABC-Zug_NRW',
    'Alarmierung ABC-Zug NRW nach Landeskonzept.'
  ),
  (
    'Ü-ABC-Bereitschaft_1_NRW',
    'Alarmierung Teileinheiten für ABC-Bereitschaft 1 NRW.'
  ),
  (
    'Ü-P-Dekon_10_NRW',
    'Alarmierung Personendekon-Einheit für 10 Personen.'
  ),
  (
    'Ü-P-Dekon_30_NRW',
    'Alarmierung Personendekon-Einheit für 30 Personen.'
  ),
  (
    'Ü-V-Dekon-Z_25_NRW',
    'Alarmierung Verletztendekon-Zug 25 Personen.'
  ),
  (
    'Ü-V-Dekon-B_50_NRW',
    'Alarmierung Verletztendekon-Bereitschaft 50 Personen.'
  ),
  (
    'Ü-Messen_1_NRW',
    'Alarmierung Messkomponente NRW.'
  ),
  (
    'Ü-Messen_2_NRW',
    'Alarmierung Messkomponente Teileinheiten NRW.'
  ),
  -- 2.8.3 Sanitäts-/Betreuungsdienst
  (
    'Ü-BHP-B_50',
    'Alarmierung Behandlungsplatz-Bereitschaft 50.'
  ),
  (
    'Ü-BTP-B_500',
    'Alarmierung Betreuungsplatz-Bereitschaft 500.'
  ),
  (
    'Ü-PTZ10',
    'Alarmierung Patiententransportzug 10.'
  ),
  (
    'Ü-BtKombi_2.0',
    'Alarmierung Betreuungs-Kombination 2.0.'
  ),
  (
    'Ü-ManV-S',
    'Nachbarliche Soforthilfe Rettungsdienst.'
  ),
  -- 2.8.4 Mobile Führungsunterstützung
  (
    'Ü-MoFüst_1',
    'Alarmierung mobile Führungsunterstützung Stäbe Stufe 1.'
  ),
  (
    'Ü-MoFüst_2',
    'Alarmierung mobile Führungsunterstützung Stäbe Stufe 2.'
  ),
  (
    'Ü-MoFüst_3',
    'Alarmierung mobile Führungsunterstützung Stäbe Stufe 3.'
  ),
  -- 2.8.5 PSNV NRW
  (
    'Ü-PSNV-E_Staffel',
    'Alarmierung Staffel PSNV-E NRW.'
  ),
  ('Ü-PSNV-E_Zug', 'Alarmierung Zug PSNV-E NRW.'),
  -- 2.8.6 MTF61
  (
    'Ü-MTF61_PtGr',
    'Alarmierung Patiententransportgruppe MTF61 nach Bundeskonzept.'
  ),
  -- 2.8.7 EU-Katastrophenschutz
  (
    'GFFF-V',
    'Alarmierung Einheit Vegetationsbrandbekämpfung EU (Ground Forest Firefighting using Vehicles).'
  );
