// sample-ig's patient profile. sample-ig defined it in a spreadsheet
// (input/resources/resources-spreadsheet.xml, worksheet myPatient), which the
// IG Publisher no longer reads; this is the same definition in FSH.
Profile: MyPatient
Parent: Patient
Id: mypatient
Title: "My Favorite Patient Profile"
Description: "This will be the description for the patient profile within the profile page"
* extension contains http://somewhere.org/fhir/uv/myig/StructureDefinition/ext-myExtension named myExtension 0..1
* extension[myExtension] ^short = "Context-specific Extension Name"
* extension[myExtension] ^definition = "Context-specific Extension Description"
* extension[myExtension] ^comment = "…Add on these extension usage notes"
* name ^slicing.discriminator[0].type = #value
* name ^slicing.discriminator[0].path = "use"
* name ^slicing.discriminator[1].type = #exists
* name ^slicing.discriminator[1].path = "period.end"
* name ^slicing.rules = #open
* name contains CurrentOfficial 1..1 MS
* name[CurrentOfficial] ^definition = "CurrentOfficial is an official name for the patient that does not have an end date specified."
* name[CurrentOfficial].use 1..1 MS
* name[CurrentOfficial].use = #official
* name[CurrentOfficial].period.end 0..0 MS

ValueSet: MyValueSet
* include codes from system http://terminology.hl7.org/ValueSet/v2-0006


// Profile: SomeProfile
// Parent: Composition
// Id: some-profile
// Title: "Test profile"
// * ^status = #draft
// * ^publisher = "Me"
// * contained ^slicing.discriminator.type = #type
// * contained ^slicing.discriminator.path = "resource"
// * contained ^slicing.rules = #open
// * contained contains Observation 0..1
// * contained[Observation] only Observation
// * contained[Observation] ^short = "Observation short working"
// * contained[Observation].code ^short = "Observation code short failing"

// Logical: MedicationSized

// * code 0..1 CodeableConcept "The code of the medication"
// * medicationProduct 0..1 BackboneElement "Description of the product"
//   * presentationUnit 0..1 CodeableConcept "Presentation Unit"
//   * doseForm 0..1 CodeableConcept "Presentation Unit"
//   * ingredient 0..* BackboneElement "Ingredients"
//     * ingredientRole 0..1 CodeableConcept "Ingredient role"
//     * ingredient 0..1 CodeableConcept "Ingredient role"
//   * packageContents 0..* BackboneElement "The contents of the product"
//     * itemQuantity	0..1 Quantity "how many items in the product"
//     * medicationProduct 0..1 contentReference #MedicationSized.medicationProduct "The contained product"


