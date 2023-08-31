import { Component, OnInit } from "@angular/core";
import { UserService } from "../user.service";

@Component({
  selector: "app-add-user",
  templateUrl: "./add-user.component.html",
  styleUrls: ["./add-user.component.css"],
})
export class AddUserComponent implements OnInit {
  newUser = { name: "", email: "" };

  constructor(private userService: UserService) {}

  ngOnInit() {}

  addUser() {
    this.userService.addUser(this.newUser).subscribe(() => {
      // Clear input fields after adding
      this.newUser.name = "";
      this.newUser.email = "";
      // Optionally, update the user list to reflect changes
      // You can do this by emitting an event or using a shared service
    });
  }
}

