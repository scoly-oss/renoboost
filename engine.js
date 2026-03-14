// ===============================================================
// RenoBoost Engine - Moteur de gestion automatisee des dossiers
// Base sur la reglementation CEE, MaPrimeRenov' et Code urbanisme
// ===============================================================

const RenoEngine = (() => {

// ---------------------------------------------------------------
// 1. REFERENTIEL REGLEMENTAIRE
// ---------------------------------------------------------------

// Types de travaux avec fiches CEE associees
const TRAVAUX_REF = {
    pac_air_eau: {
        label: "PAC Air/Eau",
        fiche_cee: "BAR-TH-104",
        rge_required: true,
        rge_qualifications: ["QualiPAC", "Qualit'EnR"],
        mairie_required: true, // unite exterieure = modif aspect ext
        mairie_type: "DP",
        mairie_motif: "Installation unite exterieure PAC (modification aspect exterieur - art. R*421-17 a)",
        mpr_eligible: true,
        mpr_parcours: "geste",
        mpr_montants: { bleu: 5000, jaune: 4000, violet: 3000, rose: 0 },
        cout_moyen: 15000,
        anciennete_min: 2, // ans (CEE)
        anciennete_min_mpr: 15, // ans (MPR)
    },
    pac_air_air: {
        label: "PAC Air/Air (Clim reversible)",
        fiche_cee: "BAR-TH-129",
        rge_required: true,
        rge_qualifications: ["QualiPAC", "Qualit'EnR"],
        mairie_required: true,
        mairie_type: "DP",
        mairie_motif: "Installation unite exterieure PAC Air/Air (modification aspect exterieur)",
        mpr_eligible: false,
        mpr_parcours: null,
        mpr_montants: { bleu: 0, jaune: 0, violet: 0, rose: 0 },
        cout_moyen: 5000,
        anciennete_min: 2,
        anciennete_min_mpr: 15,
    },
    chaudiere_biomasse: {
        label: "Chaudiere biomasse",
        fiche_cee: "BAR-TH-113",
        rge_required: true,
        rge_qualifications: ["QualiBois"],
        mairie_required: false,
        mairie_type: null,
        mairie_motif: null,
        mpr_eligible: true,
        mpr_parcours: "geste",
        mpr_montants: { bleu: 5500, jaune: 4500, violet: 2000, rose: 0 },
        cout_moyen: 18000,
        anciennete_min: 2,
        anciennete_min_mpr: 15,
    },
    isolation_murs_ext: {
        label: "Isolation murs par l'exterieur (ITE)",
        fiche_cee: "BAR-EN-102",
        rge_required: true,
        rge_qualifications: ["Qualibat", "RGE Eco-artisan"],
        mairie_required: true, // ITE = modif aspect exterieur obligatoire
        mairie_type: "DP",
        mairie_motif: "Isolation thermique par l'exterieur (modification aspect exterieur - art. R*421-17 a)",
        mpr_eligible: true,
        mpr_parcours: "ampleur_only_2026", // exclu du parcours par geste en 2026
        mpr_montants: { bleu: 75, jaune: 60, violet: 40, rose: 0 }, // par m2
        mpr_par_m2: true,
        cout_moyen_m2: 120,
        anciennete_min: 2,
        anciennete_min_mpr: 15,
    },
    isolation_murs_int: {
        label: "Isolation murs par l'interieur",
        fiche_cee: "BAR-EN-102",
        rge_required: true,
        rge_qualifications: ["Qualibat", "RGE Eco-artisan"],
        mairie_required: false,
        mairie_type: null,
        mairie_motif: null,
        mpr_eligible: true,
        mpr_parcours: "ampleur_only_2026",
        mpr_montants: { bleu: 25, jaune: 20, violet: 15, rose: 0 },
        mpr_par_m2: true,
        cout_moyen_m2: 70,
        anciennete_min: 2,
        anciennete_min_mpr: 15,
    },
    isolation_combles: {
        label: "Isolation combles / toiture",
        fiche_cee: "BAR-EN-101",
        rge_required: true,
        rge_qualifications: ["Qualibat", "RGE Eco-artisan"],
        mairie_required: false,
        mairie_type: null,
        mairie_motif: null,
        mpr_eligible: true,
        mpr_parcours: "geste",
        mpr_montants: { bleu: 25, jaune: 20, violet: 15, rose: 0 },
        mpr_par_m2: true,
        cout_moyen_m2: 50,
        anciennete_min: 2,
        anciennete_min_mpr: 15,
    },
    panneaux_solaires_toiture: {
        label: "Panneaux photovoltaiques (toiture)",
        fiche_cee: "BAR-TH-162",
        rge_required: true,
        rge_qualifications: ["QualiPV", "Qualit'EnR"],
        mairie_required: true, // modif aspect toiture
        mairie_type: "DP",
        mairie_motif: "Installation panneaux photovoltaiques en toiture (modification aspect exterieur - art. R*421-17 a)",
        mpr_eligible: true,
        mpr_parcours: "geste",
        mpr_montants: { bleu: 2200, jaune: 1600, violet: 1100, rose: 0 },
        cout_moyen: 9000,
        anciennete_min: 2,
        anciennete_min_mpr: 15,
    },
    chauffe_eau_solaire: {
        label: "Chauffe-eau solaire individuel",
        fiche_cee: "BAR-TH-143",
        rge_required: true,
        rge_qualifications: ["QualiSol", "Qualit'EnR"],
        mairie_required: true, // panneau sur toiture
        mairie_type: "DP",
        mairie_motif: "Installation capteurs solaires en toiture (modification aspect exterieur)",
        mpr_eligible: true,
        mpr_parcours: "geste",
        mpr_montants: { bleu: 4000, jaune: 3000, violet: 2000, rose: 0 },
        cout_moyen: 6000,
        anciennete_min: 2,
        anciennete_min_mpr: 15,
    },
    fenetres: {
        label: "Fenetres double/triple vitrage",
        fiche_cee: "BAR-EN-104",
        rge_required: true,
        rge_qualifications: ["Qualibat"],
        mairie_required: false, // meme aspect = dispense. Aspect different = DP
        mairie_conditionnelle: true,
        mairie_condition: "Si les nouvelles fenetres modifient l'aspect exterieur (couleur, forme, materiau different)",
        mairie_type: "DP",
        mairie_motif: "Remplacement de menuiseries modifiant l'aspect exterieur (art. R*421-17 a)",
        mpr_eligible: true,
        mpr_parcours: "geste",
        mpr_montants: { bleu: 100, jaune: 80, violet: 40, rose: 0 }, // par fenetre
        mpr_par_unite: true,
        cout_moyen_unite: 800,
        anciennete_min: 2,
        anciennete_min_mpr: 15,
    },
    vmc_double_flux: {
        label: "VMC double flux",
        fiche_cee: "BAR-TH-125",
        rge_required: true,
        rge_qualifications: ["Qualibat"],
        mairie_required: false,
        mairie_type: null,
        mairie_motif: null,
        mpr_eligible: true,
        mpr_parcours: "geste",
        mpr_montants: { bleu: 2500, jaune: 2000, violet: 1500, rose: 0 },
        cout_moyen: 5000,
        anciennete_min: 2,
        anciennete_min_mpr: 15,
    },
};

// ---------------------------------------------------------------
// 2. DOCUMENTS REQUIS PAR TYPE DE DOSSIER
// ---------------------------------------------------------------

// Documents CEE (Arrete du 4 septembre 2014, Annexes 2, 5, 7)
const DOCS_CEE = {
    // Identification beneficiaire
    attestation_honneur_beneficiaire: {
        id: "cee_ah_benef",
        label: "Attestation sur l'honneur du beneficiaire",
        description: "Modele Annexe 7 de l'arrete du 4 sept 2014. Signee par le beneficiaire ET le professionnel.",
        source: "beneficiaire + professionnel",
        auto_generable: true,
        obligatoire: true,
        quand: "apres_travaux",
    },
    devis_signe: {
        id: "cee_devis",
        label: "Devis signe par le client",
        description: "Date de signature = date d'engagement. Doit mentionner: nature travaux, lieu, caracteristiques techniques conformes a la fiche CEE.",
        source: "professionnel",
        auto_generable: false,
        obligatoire: true,
        quand: "avant_travaux",
    },
    facture: {
        id: "cee_facture",
        label: "Facture des travaux",
        description: "Doit comporter: identite beneficiaire, date emission, lieu travaux, description conforme a la fiche. Date = date d'achevement.",
        source: "professionnel",
        auto_generable: false,
        obligatoire: true,
        quand: "apres_travaux",
    },
    cadre_contribution: {
        id: "cee_cadre_contrib",
        label: "Cadre contribution CEE (Annexe 8)",
        description: "Insere/annexe au devis. Mentionne: nature de la contribution, valeur, identification du demandeur CEE, cadre du dispositif.",
        source: "systeme",
        auto_generable: true,
        obligatoire: true,
        quand: "avant_travaux",
    },
    preuve_rai: {
        id: "cee_rai",
        label: "Preuve du role actif et incitatif (RAI)",
        description: "Contrat/engagement signe AVANT la date d'engagement. Mentionne la prime CEE, son montant estime, l'identite du demandeur.",
        source: "systeme",
        auto_generable: true,
        obligatoire: true,
        quand: "avant_travaux",
    },
    justif_precarite: {
        id: "cee_precarite",
        label: "Justificatif de precarite energetique",
        description: "Avis d'imposition N-1 ou N-2, attestation CSS, ou attestation cheque energie.",
        source: "beneficiaire",
        auto_generable: false,
        obligatoire: false, // seulement si precaire
        conditionnel: true,
        condition: "revenus_precaire",
        quand: "avant_travaux",
    },
    qualification_rge: {
        id: "cee_rge",
        label: "Justificatif qualification RGE du professionnel",
        description: "Certificat RGE valide a la date d'engagement (signature devis). Qualification correspondant au type de travaux.",
        source: "professionnel",
        auto_generable: false, // mais verifiable automatiquement via API
        verifiable_auto: true,
        obligatoire: true,
        quand: "avant_travaux",
    },
    photos_avant: {
        id: "cee_photos_avant",
        label: "Photos avant travaux",
        description: "Photos de l'installation existante avant intervention. Geolocalisees et datees de preference.",
        source: "professionnel",
        auto_generable: false,
        obligatoire: true,
        quand: "avant_travaux",
    },
    photos_apres: {
        id: "cee_photos_apres",
        label: "Photos apres travaux",
        description: "Photos de l'installation apres intervention. Montrant l'equipement installe et les etiquettes.",
        source: "professionnel",
        auto_generable: false,
        obligatoire: true,
        quand: "apres_travaux",
    },
    attestation_non_cumul: {
        id: "cee_non_cumul",
        label: "Attestation de non-cumul",
        description: "Attestation que l'operation n'a pas beneficie d'aide incompatible (ou que le calcul en tient compte).",
        source: "beneficiaire",
        auto_generable: true,
        obligatoire: true,
        quand: "apres_travaux",
    },
};

// Documents MaPrimeRenov' (Decret 2020-26, Arrete 14 janvier 2020)
const DOCS_MPR = {
    identite: {
        id: "mpr_identite",
        label: "Piece d'identite du demandeur",
        description: "CNI ou passeport en cours de validite.",
        source: "beneficiaire",
        auto_generable: false,
        obligatoire: true,
        quand: "depot_demande",
    },
    avis_imposition: {
        id: "mpr_avis_impot",
        label: "Avis d'imposition N-1",
        description: "Permet de determiner le profil de revenus (Bleu/Jaune/Violet/Rose). Revenu fiscal de reference.",
        source: "beneficiaire",
        auto_generable: false,
        obligatoire: true,
        quand: "depot_demande",
    },
    justif_propriete: {
        id: "mpr_propriete",
        label: "Justificatif de propriete",
        description: "Taxe fonciere ou titre de propriete. Prouve que le demandeur est proprietaire.",
        source: "beneficiaire",
        auto_generable: false,
        obligatoire: true,
        quand: "depot_demande",
    },
    devis_rge: {
        id: "mpr_devis",
        label: "Devis signe par artisan RGE",
        description: "Doit mentionner: nature travaux, lieu, date visite prealable, mentions RGE, caracteristiques techniques.",
        source: "professionnel",
        auto_generable: false,
        obligatoire: true,
        quand: "depot_demande",
    },
    rib: {
        id: "mpr_rib",
        label: "RIB du demandeur",
        description: "Releve d'identite bancaire pour le versement de la prime.",
        source: "beneficiaire",
        auto_generable: false,
        obligatoire: true,
        quand: "depot_demande",
    },
    dpe: {
        id: "mpr_dpe",
        label: "DPE ou audit energetique",
        description: "Diagnostic de performance energetique du logement. Obligatoire depuis 2024.",
        source: "diagnostiqueur",
        auto_generable: false,
        obligatoire: true,
        quand: "depot_demande",
    },
    attestation_france_renov: {
        id: "mpr_france_renov",
        label: "Attestation contact France Renov'",
        description: "Preuve du rendez-vous prealable avec un conseiller France Renov'.",
        source: "beneficiaire",
        auto_generable: false,
        obligatoire: true,
        quand: "depot_demande",
    },
    justif_domicile: {
        id: "mpr_domicile",
        label: "Justificatif de domicile (-3 mois)",
        description: "Facture energie, quittance loyer, ou avis d'imposition. Moins de 3 mois.",
        source: "beneficiaire",
        auto_generable: false,
        obligatoire: true,
        quand: "depot_demande",
    },
    facture_finale: {
        id: "mpr_facture",
        label: "Facture finale detaillee",
        description: "Conforme au devis valide. Mentionne nature travaux, montants, references RGE.",
        source: "professionnel",
        auto_generable: false,
        obligatoire: true,
        quand: "fin_travaux",
    },
    photos_travaux: {
        id: "mpr_photos",
        label: "Photos des travaux realises",
        description: "Photos avant/apres demandees par l'ANAH pour validation.",
        source: "professionnel",
        auto_generable: false,
        obligatoire: true,
        quand: "fin_travaux",
    },
    // Specifique renovation ampleur
    audit_apres: {
        id: "mpr_audit_apres",
        label: "DPE / Audit apres travaux",
        description: "Atteste du gain de classes energetiques. Requis pour renovation d'ampleur.",
        source: "diagnostiqueur",
        auto_generable: false,
        obligatoire: false,
        conditionnel: true,
        condition: "parcours_ampleur",
        quand: "fin_travaux",
    },
    contrat_accompagnateur: {
        id: "mpr_accompagnateur",
        label: "Contrat Mon Accompagnateur Renov'",
        description: "Contrat signe avec l'accompagnateur agree. Requis pour renovation d'ampleur.",
        source: "beneficiaire",
        auto_generable: false,
        obligatoire: false,
        conditionnel: true,
        condition: "parcours_ampleur",
        quand: "depot_demande",
    },
    // Specifique bailleurs
    engagement_location: {
        id: "mpr_engagement_loc",
        label: "Engagement de location (5 ans)",
        description: "Attestation d'engagement a louer le logement en residence principale pendant 5 ans minimum.",
        source: "beneficiaire",
        auto_generable: true,
        obligatoire: false,
        conditionnel: true,
        condition: "bailleur",
        quand: "depot_demande",
    },
};

// Documents Declaration Prealable (Code urbanisme art. R*431-35 a R*431-37)
const DOCS_MAIRIE = {
    cerfa: {
        id: "dp_cerfa",
        label: "Formulaire CERFA 13703*09",
        description: "Declaration prealable pour maison individuelle. 2 exemplaires.",
        source: "systeme",
        auto_generable: true,
        obligatoire: true,
    },
    dp1_plan_situation: {
        id: "dp1",
        label: "DP1 - Plan de situation du terrain",
        description: "Plan a l'echelle 1/5000e ou 1/25000e situant le terrain dans la commune. Extrait cadastral ou carte IGN.",
        source: "systeme",
        auto_generable: true, // via API cadastre
        obligatoire: true,
    },
    dp4_plan_facades: {
        id: "dp4",
        label: "DP4 - Plan des facades et toitures",
        description: "Plan montrant l'etat initial et l'etat projete. Indique les modifications (panneaux, ITE, PAC, etc.).",
        source: "professionnel",
        auto_generable: false,
        obligatoire: true,
    },
    dp5_insertion: {
        id: "dp5",
        label: "DP5 - Document graphique d'insertion",
        description: "Representation de l'aspect exterieur apres travaux dans son environnement. Photo avec montage.",
        source: "professionnel",
        auto_generable: false,
        obligatoire: true,
    },
    dp6_photo_proche: {
        id: "dp6",
        label: "DP6 - Photo environnement proche",
        description: "Photographie situant le terrain dans l'environnement proche (rue, voisinage).",
        source: "beneficiaire",
        auto_generable: false,
        obligatoire: true,
    },
    dp7_photo_lointaine: {
        id: "dp7",
        label: "DP7 - Photo environnement lointain",
        description: "Photographie situant le terrain dans le paysage lointain.",
        source: "beneficiaire",
        auto_generable: false,
        obligatoire: true,
    },
    dp8_notice: {
        id: "dp8",
        label: "DP8 - Notice descriptive du projet",
        description: "Description du terrain, du projet, des materiaux et couleurs prevus.",
        source: "systeme",
        auto_generable: true,
        obligatoire: true,
    },
};


// ---------------------------------------------------------------
// 3. MOTEUR DE GENERATION DE DOSSIER
// ---------------------------------------------------------------

function genererDossier(params) {
    const {
        type_travaux,        // cle dans TRAVAUX_REF
        type_logement,       // 'maison' | 'appartement'
        surface,             // m2
        zone_climatique,     // 'H1' | 'H2' | 'H3'
        revenus,             // 'bleu' | 'jaune' | 'violet' | 'rose' | 'precaire' | 'classique'
        statut_proprio,      // 'occupant' | 'bailleur'
        annee_construction,  // ex: 1985
        nom_client,
        prenom_client,
        adresse_travaux,
        code_postal,
        ville,
        nom_artisan,
        siret_artisan,
        rge_numero,
        nb_fenetres,         // pour type fenetres
    } = params;

    const travaux = TRAVAUX_REF[type_travaux];
    if (!travaux) throw new Error(`Type de travaux inconnu: ${type_travaux}`);

    const anneeActuelle = new Date().getFullYear();
    const age = anneeActuelle - annee_construction;

    // Mapper revenus vers profil MPR
    const profilMPR = (revenus === 'precaire' || revenus === 'bleu') ? 'bleu'
        : (revenus === 'jaune') ? 'jaune'
        : (revenus === 'violet') ? 'violet'
        : 'rose';

    const profilCEE = (profilMPR === 'bleu' || profilMPR === 'jaune') ? 'precaire' : 'classique';

    // ---- Eligibilite ----
    const eligibilite = {
        cee: age >= travaux.anciennete_min,
        mpr: travaux.mpr_eligible && age >= travaux.anciennete_min_mpr && profilMPR !== 'rose',
        mairie: travaux.mairie_required || false,
    };

    // ---- Documents requis ----
    const documents = [];

    // -- CEE --
    if (eligibilite.cee) {
        Object.values(DOCS_CEE).forEach(doc => {
            let requis = doc.obligatoire;
            if (doc.conditionnel) {
                if (doc.condition === 'revenus_precaire' && profilCEE !== 'precaire') requis = false;
            }
            if (requis) {
                documents.push({
                    ...doc,
                    dossier: 'CEE',
                    dossier_label: `CEE - Fiche ${travaux.fiche_cee}`,
                    status: 'a_fournir',
                });
            }
        });
    }

    // -- MaPrimeRenov' --
    if (eligibilite.mpr) {
        Object.values(DOCS_MPR).forEach(doc => {
            let requis = doc.obligatoire;
            if (doc.conditionnel) {
                if (doc.condition === 'parcours_ampleur' && travaux.mpr_parcours !== 'ampleur') requis = false;
                if (doc.condition === 'bailleur' && statut_proprio !== 'bailleur') requis = false;
            }
            if (requis) {
                documents.push({
                    ...doc,
                    dossier: 'MPR',
                    dossier_label: 'MaPrimeRenov\'',
                    status: 'a_fournir',
                });
            }
        });
    }

    // -- Mairie --
    if (eligibilite.mairie) {
        Object.values(DOCS_MAIRIE).forEach(doc => {
            documents.push({
                ...doc,
                dossier: 'MAIRIE',
                dossier_label: `Declaration prealable - ${travaux.mairie_motif}`,
                status: doc.auto_generable ? 'auto_genere' : 'a_fournir',
            });
        });
    }

    // ---- Timeline automatisee ----
    const timeline = genererTimeline(travaux, eligibilite);

    // ---- Estimations financieres ----
    const estimations = calculerEstimations(travaux, profilCEE, profilMPR, surface, zone_climatique, type_logement, nb_fenetres);

    // ---- Documents auto-generables ----
    const docsAutoGenerables = documents.filter(d => d.auto_generable);
    const docsAFournir = documents.filter(d => !d.auto_generable);

    return {
        reference: `RB-${Date.now().toString(36).toUpperCase()}`,
        date_creation: new Date().toISOString(),
        client: { nom: nom_client, prenom: prenom_client, adresse: adresse_travaux, code_postal, ville },
        artisan: { nom: nom_artisan, siret: siret_artisan, rge: rge_numero },
        travaux: { type: type_travaux, label: travaux.label, fiche_cee: travaux.fiche_cee },
        logement: { type: type_logement, surface, zone_climatique, annee_construction, age, statut: statut_proprio },
        eligibilite,
        documents,
        docs_auto: docsAutoGenerables.length,
        docs_manuels: docsAFournir.length,
        total_docs: documents.length,
        timeline,
        estimations,
        alertes: genererAlertes(travaux, eligibilite, age, profilMPR),
    };
}

function genererTimeline(travaux, eligibilite) {
    const steps = [];
    let ordre = 1;

    // Phase 1: Avant travaux
    steps.push({
        ordre: ordre++,
        phase: "AVANT TRAVAUX",
        action: "Verification eligibilite & simulation",
        detail: "Verification RGE artisan, anciennete batiment, calcul des primes",
        auto: true,
        delai: "Immediat",
    });

    if (eligibilite.cee) {
        steps.push({
            ordre: ordre++,
            phase: "AVANT TRAVAUX",
            action: "Signature du cadre contribution CEE (RAI)",
            detail: "OBLIGATOIRE AVANT signature du devis. Le cadre contribution (Annexe 8) doit etre signe par le client avant l'engagement.",
            auto: true, // genere par le systeme
            delai: "Avant devis",
            alerte: "⚠️ CRITIQUE: Si signe apres le devis, le dossier CEE est IRRECEVABLE",
        });
    }

    steps.push({
        ordre: ordre++,
        phase: "AVANT TRAVAUX",
        action: "Signature du devis",
        detail: "Le client signe le devis. Cette date = date d'engagement de l'operation.",
        auto: false,
        delai: "-",
    });

    if (eligibilite.mpr) {
        steps.push({
            ordre: ordre++,
            phase: "AVANT TRAVAUX",
            action: "Depot demande MaPrimeRenov'",
            detail: "Depot en ligne sur maprimerenov.gouv.fr avec toutes les pieces. NE PAS commencer les travaux avant l'accord ANAH.",
            auto: false, // mais on pre-remplit
            delai: "Instruction ~3 mois",
            alerte: "⚠️ Attendre l'accord ANAH avant de demarrer les travaux",
        });
    }

    if (eligibilite.mairie) {
        steps.push({
            ordre: ordre++,
            phase: "AVANT TRAVAUX",
            action: "Depot declaration prealable en mairie",
            detail: `Formulaire CERFA 13703 + pieces DP1-DP8. Motif: ${travaux.mairie_motif}`,
            auto: true, // CERFA + notice auto-generes
            delai: "Instruction 1 mois (2 mois en zone ABF)",
        });
    }

    steps.push({
        ordre: ordre++,
        phase: "AVANT TRAVAUX",
        action: "Photos avant travaux",
        detail: "Photographier l'installation existante. Photos geolocalisees et datees.",
        auto: false,
        delai: "Avant demarrage chantier",
    });

    // Phase 2: Travaux
    steps.push({
        ordre: ordre++,
        phase: "TRAVAUX",
        action: "Realisation des travaux",
        detail: "Travaux realises par l'artisan RGE. Conserver tous les bons de livraison et PV.",
        auto: false,
        delai: "Variable",
    });

    // Phase 3: Apres travaux
    steps.push({
        ordre: ordre++,
        phase: "APRES TRAVAUX",
        action: "Emission de la facture",
        detail: "Facture conforme aux exigences CEE/MPR. Date facture = date d'achevement.",
        auto: false,
        delai: "A la fin du chantier",
    });

    steps.push({
        ordre: ordre++,
        phase: "APRES TRAVAUX",
        action: "Photos apres travaux + attestation sur l'honneur",
        detail: "Photos de l'installation terminee. Signature attestation Annexe 7 par client ET artisan.",
        auto: true, // attestation generee
        delai: "Immediatement apres travaux",
    });

    if (eligibilite.cee) {
        steps.push({
            ordre: ordre++,
            phase: "APRES TRAVAUX",
            action: "Depot dossier CEE au PNCEE",
            detail: "Envoi du dossier complet (tableau recapitulatif Annexe 6 + pieces). Seuil: 50 GWh cumac.",
            auto: true,
            delai: "Sous 12 mois apres achevement",
        });
    }

    if (eligibilite.mpr) {
        steps.push({
            ordre: ordre++,
            phase: "APRES TRAVAUX",
            action: "Demande de versement MaPrimeRenov'",
            detail: "Upload facture finale + photos sur maprimerenov.gouv.fr. Versement sous 15-21 jours apres validation.",
            auto: false,
            delai: "Sous 12 mois apres accord",
        });
    }

    steps.push({
        ordre: ordre++,
        phase: "VERSEMENT",
        action: "Reception des primes",
        detail: "CEE: verse par l'oblige. MPR: virement ANAH. Possibilite de deduire directement de la facture.",
        auto: false,
        delai: "1-3 mois",
    });

    return steps;
}

function calculerEstimations(travaux, profilCEE, profilMPR, surface, zone, typeLogement, nbFenetres) {
    // Cout estime
    let cout = travaux.cout_moyen || 0;
    if (travaux.cout_moyen_m2) cout = travaux.cout_moyen_m2 * surface;
    if (travaux.cout_moyen_unite && nbFenetres) cout = travaux.cout_moyen_unite * nbFenetres;

    // MPR
    let mpr = 0;
    if (travaux.mpr_eligible && profilMPR !== 'rose') {
        mpr = travaux.mpr_montants[profilMPR] || 0;
        if (travaux.mpr_par_m2) mpr = mpr * surface;
        if (travaux.mpr_par_unite && nbFenetres) mpr = mpr * nbFenetres;
    }

    // CEE (simplifie - utilise les donnees du simulateur principal pour le calcul exact)
    let cee = Math.round(cout * 0.15); // estimation par defaut ~15% du cout
    // Le calcul exact se fait via le simulateur principal (app.js)

    const total = cee + mpr;
    const reste = Math.max(0, cout - total);

    return {
        cout_estime: cout,
        prime_cee: cee,
        prime_mpr: mpr,
        total_aides: total,
        reste_a_charge: reste,
        taux_couverture: Math.round((total / cout) * 100),
    };
}

function genererAlertes(travaux, eligibilite, age, profilMPR) {
    const alertes = [];

    if (age < travaux.anciennete_min) {
        alertes.push({
            type: 'error',
            message: `Batiment trop recent pour les CEE (${age} ans, minimum ${travaux.anciennete_min} ans requis).`,
        });
    }
    if (travaux.mpr_eligible && age < travaux.anciennete_min_mpr) {
        alertes.push({
            type: 'warning',
            message: `Logement de ${age} ans: non eligible MaPrimeRenov' (minimum 15 ans).`,
        });
    }
    if (profilMPR === 'rose' && travaux.mpr_eligible) {
        alertes.push({
            type: 'info',
            message: `Profil Rose: non eligible au parcours par geste MaPrimeRenov' en 2026. Envisager la renovation d'ampleur.`,
        });
    }
    if (travaux.mpr_parcours === 'ampleur_only_2026') {
        alertes.push({
            type: 'warning',
            message: `${travaux.label}: exclu du parcours par geste MaPrimeRenov' en 2026. Eligible uniquement en renovation d'ampleur.`,
        });
    }
    if (eligibilite.mairie) {
        alertes.push({
            type: 'info',
            message: `Declaration prealable en mairie requise (delai 1 mois, 2 mois en zone ABF). Anticiper le depot.`,
        });
    }

    return alertes;
}

// ---------------------------------------------------------------
// 4. GENERATION DE DOCUMENTS
// ---------------------------------------------------------------

function genererAttestationHonneur(dossier) {
    const d = dossier;
    return `
═══════════════════════════════════════════════════════════════
           ATTESTATION SUR L'HONNEUR
    (Article 4 de l'arrete du 4 septembre 2014 - Annexe 7)
═══════════════════════════════════════════════════════════════

REFERENCE DOSSIER : ${d.reference}
DATE : ${new Date().toLocaleDateString('fr-FR')}

--- BENEFICIAIRE ---
Nom : ${d.client.nom}
Prenom : ${d.client.prenom}
Adresse des travaux : ${d.client.adresse}, ${d.client.code_postal} ${d.client.ville}

--- PROFESSIONNEL ---
Entreprise : ${d.artisan.nom}
SIRET : ${d.artisan.siret}
N° RGE : ${d.artisan.rge}

--- OPERATION ---
Nature des travaux : ${d.travaux.label}
Fiche CEE : ${d.travaux.fiche_cee}
Type de logement : ${d.logement.type}
Surface traitee : ${d.logement.surface} m²
Zone climatique : ${d.logement.zone_climatique}

Le(la) soussigne(e) ${d.client.prenom} ${d.client.nom}, beneficiaire
de l'operation decrite ci-dessus, atteste sur l'honneur que :

☐ Le logement est acheve depuis plus de 2 ans a la date
  d'engagement de l'operation
☐ Les travaux ont ete realises conformement aux prescriptions
  de la fiche d'operations standardisees ${d.travaux.fiche_cee}
☐ L'operation n'a pas fait l'objet d'une demande de CEE
  aupres d'un autre obligé
☐ Les economies d'energie liees a cette operation n'ont pas
  reduit les emissions d'une installation soumise au SEQE

Fait a .................., le ..................

Signature du beneficiaire :          Signature du professionnel :


___________________________          ___________________________
${d.client.prenom} ${d.client.nom}                    ${d.artisan.nom}
`.trim();
    }

    function genererCadreContribution(dossier) {
        const d = dossier;
        return `
═══════════════════════════════════════════════════════════════
           CADRE CONTRIBUTION CEE (ANNEXE 8)
    (Arrete du 4 septembre 2014, modifie)
═══════════════════════════════════════════════════════════════

A ANNEXER AU DEVIS - A SIGNER AVANT LE DEVIS

REFERENCE : ${d.reference}

--- IDENTIFICATION DU DEMANDEUR CEE ---
Raison sociale : RenoBoost (ou obligé partenaire)
Role : Mandataire / Partenaire du demandeur CEE

--- OPERATION ---
Nature : ${d.travaux.label}
Fiche : ${d.travaux.fiche_cee}
Lieu : ${d.client.adresse}, ${d.client.code_postal} ${d.client.ville}

--- CONTRIBUTION ---
Nature de la contribution : Prime versee au beneficiaire
Montant estime : ${d.estimations.prime_cee} EUR
(montant definitif calcule apres travaux)

Ce document s'inscrit dans le cadre du dispositif des
Certificats d'Economies d'Energie (articles L.221-1 et suivants
du Code de l'energie).

⚠️ CE DOCUMENT DOIT ETRE SIGNE PAR LE BENEFICIAIRE
   AVANT LA SIGNATURE DU DEVIS

Date : ..................

Signature du beneficiaire :

___________________________
${d.client.prenom} ${d.client.nom}

Lu et approuve, bon pour accord
`.trim();
    }

    function genererNoticeDP(dossier) {
        const d = dossier;
        const travaux = TRAVAUX_REF[d.travaux.type];
        return `
═══════════════════════════════════════════════════════════════
                    NOTICE DESCRIPTIVE (DP8)
         Declaration Prealable de Travaux
═══════════════════════════════════════════════════════════════

1. ETAT INITIAL DU TERRAIN ET DE SES ABORDS
   Adresse : ${d.client.adresse}, ${d.client.code_postal} ${d.client.ville}
   Type de construction : ${d.logement.type === 'maison' ? 'Maison individuelle' : 'Appartement en immeuble collectif'}
   Annee de construction : ${d.logement.annee_construction}

2. DESCRIPTION DU PROJET
   Nature des travaux : ${d.travaux.label}
   ${travaux.mairie_motif || ''}

3. MATERIAUX ET COULEURS
   [A completer par le professionnel]
   - Materiau : ..................
   - Couleur/finition : ..................
   - Dimensions : ..................

4. IMPACT SUR L'ASPECT EXTERIEUR
   Les travaux entrainent une modification de l'aspect
   exterieur du batiment existant, necessitant une
   declaration prealable au titre de l'article R*421-17 a)
   du Code de l'urbanisme.

5. TRAITEMENT DES ABORDS
   [A completer si necessaire]

Date : ${new Date().toLocaleDateString('fr-FR')}
`.trim();
    }

    function genererRecapDossier(dossier) {
        const d = dossier;
        const lines = [];
        lines.push('╔══════════════════════════════════════════════════════════╗');
        lines.push(`║  DOSSIER ${d.reference} - RECAPITULATIF`);
        lines.push('╠══════════════════════════════════════════════════════════╣');
        lines.push(`║ Client: ${d.client.prenom} ${d.client.nom}`);
        lines.push(`║ Adresse: ${d.client.adresse}, ${d.client.code_postal} ${d.client.ville}`);
        lines.push(`║ Travaux: ${d.travaux.label} (${d.travaux.fiche_cee})`);
        lines.push(`║ Logement: ${d.logement.type}, ${d.logement.surface}m², zone ${d.logement.zone_climatique}`);
        lines.push('╠══════════════════════════════════════════════════════════╣');
        lines.push('║ ESTIMATIONS FINANCIERES');
        lines.push(`║   Cout estime:     ${d.estimations.cout_estime.toLocaleString('fr-FR')} EUR`);
        lines.push(`║   Prime CEE:       ${d.estimations.prime_cee.toLocaleString('fr-FR')} EUR`);
        lines.push(`║   MaPrimeRenov':   ${d.estimations.prime_mpr.toLocaleString('fr-FR')} EUR`);
        lines.push(`║   TOTAL AIDES:     ${d.estimations.total_aides.toLocaleString('fr-FR')} EUR`);
        lines.push(`║   Reste a charge:  ${d.estimations.reste_a_charge.toLocaleString('fr-FR')} EUR`);
        lines.push(`║   Couverture:      ${d.estimations.taux_couverture}%`);
        lines.push('╠══════════════════════════════════════════════════════════╣');
        lines.push(`║ DOCUMENTS: ${d.docs_auto} auto-generes / ${d.docs_manuels} a fournir / ${d.total_docs} total`);
        lines.push('║');

        const parDossier = {};
        d.documents.forEach(doc => {
            if (!parDossier[doc.dossier]) parDossier[doc.dossier] = [];
            parDossier[doc.dossier].push(doc);
        });

        Object.entries(parDossier).forEach(([dossier, docs]) => {
            lines.push(`║ ── ${dossier} ──`);
            docs.forEach(doc => {
                const icon = doc.auto_generable ? '🤖' : (doc.source === 'beneficiaire' ? '👤' : '🔨');
                lines.push(`║   ${icon} ${doc.label}`);
                lines.push(`║      ${doc.auto_generable ? '[AUTO-GENERE]' : `[A FOURNIR par: ${doc.source}]`} - ${doc.quand || ''}`);
            });
        });

        lines.push('╠══════════════════════════════════════════════════════════╣');
        lines.push('║ ALERTES');
        d.alertes.forEach(a => {
            const icon = a.type === 'error' ? '🔴' : a.type === 'warning' ? '🟡' : '🔵';
            lines.push(`║ ${icon} ${a.message}`);
        });
        lines.push('╚══════════════════════════════════════════════════════════╝');

        return lines.join('\n');
    }


// ---------------------------------------------------------------
// 5. API PUBLIQUE
// ---------------------------------------------------------------

return {
    TRAVAUX_REF,
    DOCS_CEE,
    DOCS_MPR,
    DOCS_MAIRIE,
    genererDossier,
    genererAttestationHonneur,
    genererCadreContribution,
    genererNoticeDP,
    genererRecapDossier,
};

})();

// Export pour Node.js ou usage direct
if (typeof module !== 'undefined' && module.exports) {
    module.exports = RenoEngine;
}
