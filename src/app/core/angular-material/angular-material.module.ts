import { NgModule } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatNativeDateModule } from "@angular/material/core";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatDialogModule } from "@angular/material/dialog";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatListModule } from "@angular/material/list";
import { MatMenuModule } from "@angular/material/menu";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatRadioModule } from "@angular/material/radio";
import { MatSelectModule } from "@angular/material/select";
import { MatTableModule } from "@angular/material/table";
import { MatTabsModule } from "@angular/material/tabs";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatTooltipModule } from "@angular/material/tooltip";

@NgModule({
    declarations: [],
    exports: [
        MatTabsModule,
        MatTableModule,
        MatRadioModule,
        MatButtonModule,
        MatTooltipModule,
        MatIconModule,
        MatDialogModule,
        MatListModule,
        MatFormFieldModule,
        MatInputModule,
        MatCheckboxModule,
        MatMenuModule,
        MatProgressBarModule,
        MatExpansionModule,
        MatProgressSpinnerModule,
        MatToolbarModule,
        MatCardModule,
        MatSelectModule,
        MatPaginatorModule,
        MatDatepickerModule,
        MatNativeDateModule
    ]
})
export class AngularMaterialModule { }
