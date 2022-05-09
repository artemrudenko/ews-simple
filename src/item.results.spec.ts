jest.mock("ews-javascript-api", () => ({
  WellKnownFolderName: jest.fn().mockImplementation(() => ({ Inbox: jest.fn() })),
  BasePropertySet: jest.fn().mockImplementation(() => ({ FirstClassProperties: jest.fn() })),
  ExchangeVersion: jest.fn().mockImplementation(() => ({ Exchange2013: jest.fn() })),
  ExchangeService: jest.fn().mockImplementation(() => ({ Credentials: jest.fn() })),
  PropertySet: jest.fn().mockImplementation(() => ({})),
  OffsetBasePoint: jest.fn().mockImplementation(() => ({ Beginning: jest.fn() })),
  ItemSchema: jest.fn().mockImplementation(() => ({
    Attachments: jest.fn(),
    HasAttachments: jest.fn()
  })),
  ItemView: jest.fn().mockImplementation(() => ({})),
  EmailMessageSchema: jest.fn().mockImplementation(() => ({ Body: jest.fn() })),
  WebCredentials: jest.fn().mockImplementation(() => ({})),
  Uri: jest.fn().mockImplementation(() => ({})),
  Folder: jest.fn()
}));

import { ExchangeService, Folder } from "ews-javascript-api";

import { ClientBuilder } from "./client";
import { FindItemsResultBuilder } from "./item.results";

Folder.Bind = jest.fn().mockImplementation(() => {
  return {
    FindItems: jest.fn().mockReturnValue({
      TotalCount: 10,
      Items: []
    })
  };
});

describe('Item Results::', () => {
  let service: ExchangeService;

  beforeAll(() => {
    service = new ClientBuilder()
      .withUser(`<EWS username>`)
      .withPwd(`<EWS user pwd>`)
      .build();
  });

  test(`should allow to read emails from the specified folder`, async () => {
    const items = await new FindItemsResultBuilder()
      .withService(service)
      .withQueryString('isread:false')
      .withGetRaw(true)
      .withSaveAttachments(true)
      .withMarkAsRead(false)
      .execute();

    expect(items)
      .toBeDefined();
  });

  test(`should allow to read emails and save attachments`, async () => {
    const items = await new FindItemsResultBuilder()
      .withService(service)
      .withQueryString('isread:false')
      .withMarkAsRead(false)
      .withSaveAttachments(true)
      .execute();

    expect(items)
      .toBeDefined();
  });

});
