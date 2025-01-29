Profile: MyPatient
Parent: Patient

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


