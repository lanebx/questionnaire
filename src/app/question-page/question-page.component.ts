import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-question-page',
  templateUrl: './question-page.component.html',
  styleUrls: ['./question-page.component.scss']
})
export class QuestionPageComponent {
  constructor(private fb: FormBuilder) { }

  questionForm!: FormGroup
  description: string
  type: string

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() : void {
    this.questionForm = this.fb.group({
      description: new FormControl('', Validators.required),
      type: new FormControl('', Validators.required),
      multipleChoice: this.fb.array([this.fb.control('', Validators.required)])
    })
  }

  allTypes = [
    'Single choice',
    'Multiple Choice',
    'Open choice',
  ]

  onSubmit() {
    console.log(this.questionForm)
  }

  selectType(event: any): void {
    console.log(event.target.value)
    this.type = this.allTypes.find((t) => t === event.target.value)
  }

  addHobby(): void {
    if (this.multipleChoice.value.every((item: any) => item.length >= 1)) {
      this.multipleChoice.push(this.fb.control(''));
    }
  }

  removeHobby(index: number) : void {
    this.multipleChoice.removeAt(index);
  }

  get multipleChoice(): FormArray {
    return this.questionForm.get('multipleChoice') as FormArray;
  }
}
