import React from "react";
import { RouteComponentProps } from "react-router";
import styles from "./patient-chart-summary.css";
import HistorySection from "./history/history-section.component";
import DocumentationSection from "./documentation/documentation-section.component";
import AllergyCard from "./history/allergy-card.component";
import ConditionsCard from "./history/conditions-card.component";
import NotesCard from "./history/notes-card.component";
import DimensionsCard from "./documentation/dimensions-card.component";
import VitalsCard from "./documentation/vitals-card.component";
import { match } from "minimatch";


export default function PatientChartSummary(props: PatientChartSummaryProps) {

  const config = [
    "conditions",
    "allergies",
    "notes",
    "vitals",
    "heightAndWeight"
  ];  
  
  const coreComponents = {
    "conditions":ConditionsCard,
    "allergies":AllergyCard,
    "notes":NotesCard,
    "vitals":VitalsCard,
    "heightAndWeight":DimensionsCard
  };

  return (
    <main className="omrs-main-content">
      <div className={styles.sectionCards}>
        {
          config.map(widgetName => {
            const Component = coreComponents[widgetName];
            return (
              <Component props={props.match}/>
            );
          })
       }
      </div>

    </main>
  );
}

type PatientChartSummaryProps = RouteComponentProps & {};
