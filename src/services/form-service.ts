import { Injectable } from "@angular/core";


type formData = Partial<{ firstName: string | null; middleName: string | null; lastName: string | null; gender: string | null; email: string | null; studentId: string | null; stream: string | null; }> | null


@Injectable({
    providedIn: 'root'
})
export class FormService {
    data: formData = null

    setData(data: formData) {
        this.data = data;
    }

}