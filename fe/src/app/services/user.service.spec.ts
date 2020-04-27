import { UserService } from "./user.service";
import { TestBed, inject } from "@angular/core/testing";

import {
  HttpClientTestingModule,
  HttpTestingController,
} from "@angular/common/http/testing";
import { User } from "../interfaces/user.interface";

const mockUser: User = {
  hasPlaylist: false,
  _id: "123456789999",
  email: "testdummy@gmail.com",
  subbedChannels: [],
  displayName: "Tester Dummy",
  username: "123456778",
  spotifyId: "123456778",
  photo: "fake-url",
  firstName: "Tester",
  lastName: "Dummy",
};

describe("Service: UserService", () => {
  let userService: UserService;
  let httpMock: HttpClientTestingModule;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService],
    });
  });

  beforeEach(inject(
    [UserService, HttpTestingController],
    (_service, _httpMock) => {
      userService = _service;
      httpMock = _httpMock;
    }
  ));

  it("getUser: should call next on user BehaviorSubject with fetched user", () => {
    expect(userService.getUser()).toEqual(expect(expect.));
  });
});
