// Generated from measured /pricing layout (1440). Copy is neutral filler sized to the original line counts.
// h = measured row or card height in px at 1440; lines = body line count.

export type PriceLine = { k: "price" | "sub" | "note" | "label" | "link" | "a"; t: string; h: number; mt?: number };
export type PriceRow = { title: string; body: string; lines: number; h: number; price: PriceLine[] };
export type PriceAccordion = { title: string; summary: string | null; rows: PriceRow[] };
export type PriceCard = { title: string; lead: string; cta: string | null; bullets: string[]; head: number; h: number; rows: PriceRow[]; acc: PriceAccordion[]; foot: string | null };
export type PriceGroup = { title: string; lead: string; cards: PriceCard[] };

export const priceGroups: PriceGroup[] = [
  {
    "title": "Global payments",
    "lead": "Acme gives your team one place to run payments, plans, and payouts with clear reports and simple controls. Set up in minutes, adjust as you grow.",
    "cards": [
      {
        "title": "Payments",
        "lead": "Set up in minutes, adjust as you grow.",
        "cta": "Start now",
        "bullets": [
          "Set up in minutes, adjust as you grow, and keep every account.",
          "Our tools handle the routine work so you can focus on customers.",
          "Each feature works on its own or together with the rest.",
          "Acme gives your team."
        ],
        "head": 228,
        "h": 1833,
        "rows": [
          {
            "title": "Cards and wallets",
            "body": "Our tools handle the routine work so you can focus on customers, product, and steady revenue growth.",
            "lines": 2,
            "h": 159,
            "price": [
              {
                "k": "price",
                "t": "3.0% + 41¢",
                "h": 20
              },
              {
                "k": "sub",
                "t": "per settled charge for local accounts in each",
                "h": 20,
                "mt": 2
              },
              {
                "k": "note",
                "t": "+ 1.6% region with standard terms",
                "h": 17,
                "mt": 4
              },
              {
                "k": "note",
                "t": "+ 2.6% and monthly reporting",
                "h": 17,
                "mt": 4
              },
              {
                "k": "note",
                "t": "+ 2% across every plan per settled",
                "h": 17,
                "mt": 4
              }
            ]
          },
          {
            "title": "Buy Now Pay Later",
            "body": "Each feature works on its own or together with the rest of the platform, with no extra setup required.",
            "lines": 2,
            "h": 134,
            "price": [
              {
                "k": "price",
                "t": "6.00% + 41¢",
                "h": 20
              },
              {
                "k": "sub",
                "t": "charge for local accounts in each",
                "h": 20,
                "mt": 2
              },
              {
                "k": "link",
                "t": "See more payment methods",
                "h": 33,
                "mt": 2
              }
            ]
          },
          {
            "title": "Bank-based and other payment methods",
            "body": "Acme gives your team one place to run payments, plans, and payouts with clear reports.",
            "lines": 2,
            "h": 130,
            "price": [
              {
                "k": "price",
                "t": "1.9%",
                "h": 20
              },
              {
                "k": "sub",
                "t": "region with standard",
                "h": 20,
                "mt": 2
              },
              {
                "k": "note",
                "t": "$6.11 cap terms",
                "h": 17,
                "mt": 4
              },
              {
                "k": "link",
                "t": "See more payment methods",
                "h": 33,
                "mt": 2
              }
            ]
          },
          {
            "title": "Stablecoins",
            "body": "Set up in minutes, adjust as you grow.",
            "lines": 1,
            "h": 151,
            "price": [
              {
                "k": "price",
                "t": "2.6%",
                "h": 20
              },
              {
                "k": "sub",
                "t": "and monthly reporting across every",
                "h": 20,
                "mt": 2
              },
              {
                "k": "note",
                "t": "plan per settled charge for local accounts in each region with standard",
                "h": 42,
                "mt": 2
              },
              {
                "k": "link",
                "t": "Learn more",
                "h": 33
              }
            ]
          },
          {
            "title": "Disputes",
            "body": "Our tools handle the routine work so you can focus on customers, product, and steady revenue growth.",
            "lines": 2,
            "h": 444,
            "price": [
              {
                "k": "label",
                "t": "terms and monthly reporting across",
                "h": 21,
                "mt": 1
              },
              {
                "k": "price",
                "t": "$26.11",
                "h": 20
              },
              {
                "k": "sub",
                "t": "every plan per settled charge",
                "h": 20,
                "mt": 2
              },
              {
                "k": "note",
                "t": "for local accounts in each region with standard",
                "h": 21,
                "mt": 2
              },
              {
                "k": "label",
                "t": "terms and monthly reporting across",
                "h": 21,
                "mt": 24
              },
              {
                "k": "price",
                "t": "$26.11",
                "h": 20
              },
              {
                "k": "sub",
                "t": "every plan per settled charge for local",
                "h": 20,
                "mt": 2
              },
              {
                "k": "note",
                "t": "accounts in each region with standard terms and monthly reporting across",
                "h": 42,
                "mt": 2
              },
              {
                "k": "link",
                "t": "Learn more",
                "h": 33
              },
              {
                "k": "label",
                "t": "every plan per settled charge",
                "h": 21,
                "mt": 24
              },
              {
                "k": "price",
                "t": "$26.11",
                "h": 20
              },
              {
                "k": "sub",
                "t": "for local accounts in each",
                "h": 20,
                "mt": 2
              },
              {
                "k": "note",
                "t": "region with standard terms and monthly reporting across every plan per",
                "h": 42,
                "mt": 2
              },
              {
                "k": "link",
                "t": "Learn more",
                "h": 33
              }
            ]
          },
          {
            "title": "Smart Disputes",
            "body": "Each feature works on its own or together with the rest of the platform, with no extra setup required.",
            "lines": 2,
            "h": 196,
            "price": [
              {
                "k": "label",
                "t": "settled charge for local accounts",
                "h": 21,
                "mt": 1
              },
              {
                "k": "price",
                "t": "41%",
                "h": 20
              },
              {
                "k": "sub",
                "t": "in each region with standard",
                "h": 44,
                "mt": 2
              },
              {
                "k": "note",
                "t": "terms and monthly reporting across every plan per settled charge for local",
                "h": 42,
                "mt": 2
              },
              {
                "k": "link",
                "t": "Learn more",
                "h": 33
              }
            ]
          },
          {
            "title": "Dispute prevention",
            "body": "Acme gives your team one place to run payments, plans, and payouts with clear reports.",
            "lines": 2,
            "h": 277,
            "price": [
              {
                "k": "price",
                "t": "Included",
                "h": 20
              },
              {
                "k": "a",
                "t": "Learn more",
                "h": 20,
                "mt": 2
              },
              {
                "k": "price",
                "t": "$26.11",
                "h": 20,
                "mt": 25
              },
              {
                "k": "sub",
                "t": "accounts in each",
                "h": 20,
                "mt": 2
              },
              {
                "k": "price",
                "t": "$26.11",
                "h": 20,
                "mt": 25
              },
              {
                "k": "sub",
                "t": "region with standard terms and monthly",
                "h": 20,
                "mt": 2
              },
              {
                "k": "price",
                "t": "$30.11",
                "h": 20,
                "mt": 25
              },
              {
                "k": "sub",
                "t": "reporting across every plan",
                "h": 20,
                "mt": 2
              }
            ]
          }
        ],
        "acc": [
          {
            "title": "Payment optimizations",
            "summary": "Included with Payments",
            "rows": [
              {
                "title": "3D Secure authentication",
                "body": "Each feature works on its own or together with the rest of the platform, with no extra setup required. Acme gives your team one place to run payments, plans, and payouts with clear reports.",
                "lines": 4,
                "h": 239,
                "price": [
                  {
                    "k": "price",
                    "t": "Included",
                    "h": 20
                  },
                  {
                    "k": "sub",
                    "t": "in each region",
                    "h": 20,
                    "mt": 2
                  },
                  {
                    "k": "note",
                    "t": "$1.14 with standard terms and monthly reporting across every plan per settled",
                    "h": 38,
                    "mt": 4
                  },
                  {
                    "k": "link",
                    "t": "Learn more",
                    "h": 33,
                    "mt": 2
                  },
                  {
                    "k": "label",
                    "t": "charge for local accounts in",
                    "h": 21,
                    "mt": 24
                  },
                  {
                    "k": "price",
                    "t": "$1.23",
                    "h": 20
                  },
                  {
                    "k": "sub",
                    "t": "each region with standard",
                    "h": 20,
                    "mt": 2
                  }
                ]
              },
              {
                "title": "Authorization Boost",
                "body": "Acme gives your team one place to run payments, plans, and payouts with clear reports and simple controls. Set up in minutes, adjust as you grow, and keep every account in sync across regions and currencies. Our tools handle the routine work so you can focus on customers, product.",
                "lines": 6,
                "h": 209,
                "price": [
                  {
                    "k": "price",
                    "t": "Included",
                    "h": 20
                  },
                  {
                    "k": "sub",
                    "t": "terms and monthly",
                    "h": 20,
                    "mt": 2
                  },
                  {
                    "k": "note",
                    "t": "1.3% reporting across every plan per settled charge for local accounts in each",
                    "h": 38,
                    "mt": 4
                  },
                  {
                    "k": "link",
                    "t": "Learn more",
                    "h": 33,
                    "mt": 2
                  }
                ]
              }
            ]
          },
          {
            "title": "More features",
            "summary": null,
            "rows": [
              {
                "title": "Adaptive Pricing",
                "body": "Set up in minutes, adjust as you grow, and keep every account in sync across regions and currencies.",
                "lines": 2,
                "h": 151,
                "price": [
                  {
                    "k": "price",
                    "t": "Included",
                    "h": 20
                  },
                  {
                    "k": "sub",
                    "t": "region with standard",
                    "h": 20,
                    "mt": 2
                  },
                  {
                    "k": "note",
                    "t": "terms and monthly reporting across every plan per settled charge for local",
                    "h": 38,
                    "mt": 4
                  },
                  {
                    "k": "link",
                    "t": "Learn more",
                    "h": 33,
                    "mt": 2
                  }
                ]
              },
              {
                "title": "Instant payouts",
                "body": "Our tools handle the routine work so you can focus on customers, product, and steady revenue growth. Each feature works on its own or together.",
                "lines": 3,
                "h": 151,
                "price": [
                  {
                    "k": "price",
                    "t": "2.6%",
                    "h": 20
                  },
                  {
                    "k": "sub",
                    "t": "accounts in each region",
                    "h": 20,
                    "mt": 2
                  },
                  {
                    "k": "note",
                    "t": "with standard terms",
                    "h": 17,
                    "mt": 4
                  },
                  {
                    "k": "note",
                    "t": "and monthly reporting across every plan per settled",
                    "h": 21,
                    "mt": 2
                  },
                  {
                    "k": "link",
                    "t": "Learn more",
                    "h": 33
                  }
                ]
              },
              {
                "title": "Instant currency conversion",
                "body": "Each feature works on its own or together with the rest of the platform, with no extra setup required.",
                "lines": 2,
                "h": 109,
                "price": [
                  {
                    "k": "price",
                    "t": "1.6%",
                    "h": 20
                  },
                  {
                    "k": "sub",
                    "t": "charge for local accounts",
                    "h": 20,
                    "mt": 2
                  },
                  {
                    "k": "link",
                    "t": "Learn more",
                    "h": 33,
                    "mt": 2
                  }
                ]
              },
              {
                "title": "Vault and Relay API",
                "body": "Acme gives your team one place to run payments, plans, and payouts with clear reports and simple controls. Set up in minutes, adjust as you grow.",
                "lines": 3,
                "h": 129,
                "price": [
                  {
                    "k": "price",
                    "t": "Contact sales",
                    "h": 20
                  },
                  {
                    "k": "note",
                    "t": "in each region with standard terms and monthly reporting",
                    "h": 21
                  },
                  {
                    "k": "link",
                    "t": "Learn more",
                    "h": 33
                  }
                ]
              },
              {
                "title": "Foreign Exchange Quotes API",
                "body": "Set up in minutes, adjust as you grow, and keep every account in sync across regions and currencies.",
                "lines": 2,
                "h": 130,
                "price": [
                  {
                    "k": "price",
                    "t": "2%",
                    "h": 20
                  },
                  {
                    "k": "sub",
                    "t": "across every plan per settled",
                    "h": 20,
                    "mt": 2
                  },
                  {
                    "k": "note",
                    "t": "charge for local accounts in",
                    "h": 17,
                    "mt": 4
                  },
                  {
                    "k": "link",
                    "t": "Learn more",
                    "h": 33,
                    "mt": 2
                  }
                ]
              },
              {
                "title": "Shared Payment Tokens",
                "body": "Our tools handle the routine work so you can focus on customers, product, and steady revenue growth.",
                "lines": 2,
                "h": 109,
                "price": [
                  {
                    "k": "price",
                    "t": "$1.26",
                    "h": 20
                  },
                  {
                    "k": "sub",
                    "t": "each region with",
                    "h": 20,
                    "mt": 2
                  },
                  {
                    "k": "link",
                    "t": "Learn more",
                    "h": 33,
                    "mt": 2
                  }
                ]
              }
            ]
          }
        ],
        "foot": null
      },
      {
        "title": "Fast checkout",
        "lead": "Acme gives your team one place to run payments, plans, and payouts with clear reports and simple controls. Set up in minutes.",
        "cta": "Start now",
        "bullets": [
          "Set up in minutes, adjust as you grow.",
          "Our tools handle the routine work so you can focus on customers, product, and steady revenue growth.",
          "Each feature works on its own or together with the rest of the platform, with no extra setup required."
        ],
        "head": 272,
        "h": 860,
        "rows": [
          {
            "title": "Cards",
            "body": "Set up in minutes.",
            "lines": 1,
            "h": 118,
            "price": [
              {
                "k": "price",
                "t": "3.0% + 41¢",
                "h": 20
              },
              {
                "k": "sub",
                "t": "per settled charge for local",
                "h": 20,
                "mt": 2
              },
              {
                "k": "note",
                "t": "+ 2.6% accounts in each region with",
                "h": 17,
                "mt": 4
              },
              {
                "k": "note",
                "t": "+ 2% standard terms and monthly reporting",
                "h": 17,
                "mt": 4
              }
            ]
          },
          {
            "title": "Stablecoins",
            "body": "Our tools handle the routine work so you can focus on customers, product, and steady revenue growth. Each feature works on its own or together.",
            "lines": 3,
            "h": 129,
            "price": [
              {
                "k": "price",
                "t": "1.9%",
                "h": 20
              },
              {
                "k": "sub",
                "t": "across every plan per settled",
                "h": 20,
                "mt": 2
              },
              {
                "k": "note",
                "t": "charge for local accounts in each region with standard terms and monthly",
                "h": 38,
                "mt": 4
              }
            ]
          },
          {
            "title": "Instant local transfers",
            "body": "Each feature works on its own or together with the rest of the platform, with no extra setup required.",
            "lines": 2,
            "h": 118,
            "price": [
              {
                "k": "price",
                "t": "2.9% + 41¢",
                "h": 20
              },
              {
                "k": "sub",
                "t": "reporting across every plan",
                "h": 20,
                "mt": 2
              },
              {
                "k": "note",
                "t": "+ 2.6% per settled charge for local",
                "h": 17,
                "mt": 4
              },
              {
                "k": "note",
                "t": "+ 2% accounts in each region with",
                "h": 17,
                "mt": 4
              }
            ]
          },
          {
            "title": "Instant bank payments",
            "body": "Acme gives your team one place to run payments, plans, and payouts with clear reports.",
            "lines": 2,
            "h": 105,
            "price": [
              {
                "k": "price",
                "t": "3.7% + 41¢",
                "h": 20
              },
              {
                "k": "sub",
                "t": "standard terms and monthly",
                "h": 20,
                "mt": 2
              }
            ]
          },
          {
            "title": "Pay later partner",
            "body": "Set up in minutes, adjust as you grow, and keep every account in sync across regions and currencies.",
            "lines": 2,
            "h": 118,
            "price": [
              {
                "k": "price",
                "t": "6.00% + 41¢",
                "h": 20
              },
              {
                "k": "sub",
                "t": "reporting across every plan",
                "h": 20,
                "mt": 2
              },
              {
                "k": "note",
                "t": "+ 2.6% per settled charge for local",
                "h": 17,
                "mt": 4
              },
              {
                "k": "note",
                "t": "+ 2% accounts in each region with",
                "h": 17,
                "mt": 4
              }
            ]
          }
        ],
        "acc": [],
        "foot": null
      },
      {
        "title": "Pay links",
        "lead": "Set up in minutes, adjust as you grow.",
        "cta": "Start now",
        "bullets": [
          "Our tools handle the routine.",
          "Each feature works on its own or together.",
          "Acme gives your team one place to run payments, plans, and payouts."
        ],
        "head": 200,
        "h": 566,
        "rows": [
          {
            "title": "Accept payments",
            "body": "Our tools handle the routine.",
            "lines": 1,
            "h": 81,
            "price": [
              {
                "k": "price",
                "t": "Included",
                "h": 20
              },
              {
                "k": "sub",
                "t": "standard terms",
                "h": 20,
                "mt": 2
              }
            ]
          },
          {
            "title": "Custom domain",
            "body": "Each feature works on its own or together with the rest of the platform, with no extra setup required.",
            "lines": 2,
            "h": 109,
            "price": [
              {
                "k": "price",
                "t": "$21.11",
                "h": 20
              },
              {
                "k": "sub",
                "t": "and monthly",
                "h": 20,
                "mt": 2
              },
              {
                "k": "link",
                "t": "Learn more",
                "h": 33,
                "mt": 2
              }
            ]
          },
          {
            "title": "Post-payment invoices",
            "body": "Acme gives your team one place to run payments, plans, and payouts with clear reports.",
            "lines": 2,
            "h": 176,
            "price": [
              {
                "k": "price",
                "t": "1.5%",
                "h": 20
              },
              {
                "k": "sub",
                "t": "reporting across every",
                "h": 20,
                "mt": 2
              },
              {
                "k": "price",
                "t": "$3.11",
                "h": 20,
                "mt": 25
              },
              {
                "k": "sub",
                "t": "plan per settled",
                "h": 20,
                "mt": 2
              },
              {
                "k": "link",
                "t": "Learn more",
                "h": 33,
                "mt": 2
              }
            ]
          }
        ],
        "acc": [],
        "foot": null
      },
      {
        "title": "Checkout",
        "lead": "Acme gives your team.",
        "cta": "Start now",
        "bullets": [
          "Set up in minutes, adjust as you grow.",
          "Our tools handle the routine work so you can focus on customers.",
          "Each feature works."
        ],
        "head": 200,
        "h": 566,
        "rows": [
          {
            "title": "Accept payments",
            "body": "Set up in minutes, adjust as you grow.",
            "lines": 1,
            "h": 81,
            "price": [
              {
                "k": "price",
                "t": "Included",
                "h": 20
              },
              {
                "k": "sub",
                "t": "charge for local",
                "h": 20,
                "mt": 2
              }
            ]
          },
          {
            "title": "Custom domain",
            "body": "Our tools handle the routine work so you can focus on customers, product, and steady revenue growth.",
            "lines": 2,
            "h": 109,
            "price": [
              {
                "k": "price",
                "t": "$21.11",
                "h": 20
              },
              {
                "k": "sub",
                "t": "accounts in",
                "h": 20,
                "mt": 2
              },
              {
                "k": "link",
                "t": "Learn more",
                "h": 33,
                "mt": 2
              }
            ]
          },
          {
            "title": "Post-payment invoices",
            "body": "Each feature works on its own or together with the rest of the platform, with no extra setup required.",
            "lines": 2,
            "h": 176,
            "price": [
              {
                "k": "price",
                "t": "1.5%",
                "h": 20
              },
              {
                "k": "sub",
                "t": "each region with standard",
                "h": 20,
                "mt": 2
              },
              {
                "k": "price",
                "t": "$3.11",
                "h": 20,
                "mt": 25
              },
              {
                "k": "sub",
                "t": "terms and monthly",
                "h": 20,
                "mt": 2
              },
              {
                "k": "link",
                "t": "Learn more",
                "h": 33,
                "mt": 2
              }
            ]
          }
        ],
        "acc": [],
        "foot": null
      },
      {
        "title": "Merchant services",
        "lead": "Each feature works on its own or together.",
        "cta": "Start now",
        "bullets": [
          "Acme gives your team one place to run payments, plans, and payouts.",
          "Set up in minutes, adjust as you grow, and keep every account in sync.",
          "Our tools handle the routine work so you can focus on customers, product."
        ],
        "head": 200,
        "h": 377,
        "rows": [
          {
            "title": "Merchant of record services",
            "body": "Acme gives your team one place to run payments, plans, and payouts with clear reports and simple controls. Set up in minutes, adjust as you grow, and keep every account in sync across regions and currencies. Our tools handle the routine.",
            "lines": 5,
            "h": 177,
            "price": [
              {
                "k": "price",
                "t": "4.6%",
                "h": 20
              },
              {
                "k": "sub",
                "t": "reporting across every plan per settled",
                "h": 44,
                "mt": 2
              },
              {
                "k": "link",
                "t": "Learn more",
                "h": 33,
                "mt": 2
              }
            ]
          }
        ],
        "acc": [],
        "foot": null
      },
      {
        "title": "In-person",
        "lead": "Set up in minutes, adjust as you grow.",
        "cta": "Start now",
        "bullets": [
          "Set up in minutes, adjust as you grow, and keep every account in sync.",
          "Our tools handle the routine work so you can focus on customers, product.",
          "Each feature works on its own or together with the rest of the platform.",
          "Acme gives your team."
        ],
        "head": 228,
        "h": 860,
        "rows": [
          {
            "title": "Cards and wallets",
            "body": "Our tools handle the routine work so you can focus on customers, product, and steady revenue growth.",
            "lines": 2,
            "h": 160,
            "price": [
              {
                "k": "price",
                "t": "3.8% + 6¢",
                "h": 20
              },
              {
                "k": "sub",
                "t": "charge for local accounts in each region with",
                "h": 20,
                "mt": 2
              },
              {
                "k": "note",
                "t": "+ 2.6% standard terms and",
                "h": 17,
                "mt": 4
              },
              {
                "k": "note",
                "t": "+ $1.21 monthly reporting across every",
                "h": 17,
                "mt": 4
              },
              {
                "k": "note",
                "t": "+ $1.16 plan per settled charge for local accounts in each region with standard",
                "h": 38,
                "mt": 4
              }
            ]
          },
          {
            "title": "Card readers",
            "body": "Each feature works on its own or together with the rest of the platform, with no extra setup required. Acme gives your team one place to run payments.",
            "lines": 3,
            "h": 277,
            "price": [
              {
                "k": "price",
                "t": "$60.11",
                "h": 20
              },
              {
                "k": "sub",
                "t": "terms and monthly",
                "h": 20,
                "mt": 2
              },
              {
                "k": "price",
                "t": "$300.11",
                "h": 20,
                "mt": 25
              },
              {
                "k": "sub",
                "t": "reporting across every",
                "h": 20,
                "mt": 2
              },
              {
                "k": "price",
                "t": "$300.11",
                "h": 20,
                "mt": 25
              },
              {
                "k": "sub",
                "t": "plan per settled charge",
                "h": 20,
                "mt": 2
              },
              {
                "k": "price",
                "t": "$430.11",
                "h": 20,
                "mt": 25
              },
              {
                "k": "sub",
                "t": "for local accounts",
                "h": 20,
                "mt": 2
              }
            ]
          },
          {
            "title": "Cellular",
            "body": "Acme gives your team one place to run payments, plans, and payouts with clear reports and simple controls. Set up in minutes, adjust as you grow.",
            "lines": 3,
            "h": 129,
            "price": [
              {
                "k": "price",
                "t": "$21.11",
                "h": 20
              },
              {
                "k": "sub",
                "t": "in each region with",
                "h": 20,
                "mt": 2
              }
            ]
          }
        ],
        "acc": [],
        "foot": "See pricing details"
      },
      {
        "title": "Bank data",
        "lead": "Acme gives your team.",
        "cta": "Start now",
        "bullets": [
          "Set up in minutes, adjust as you grow, and keep every account.",
          "Our tools handle the routine work so you can focus on customers.",
          "Each feature works on its own or together."
        ],
        "head": 200,
        "h": 734,
        "rows": [
          {
            "title": "Instant bank account verifications",
            "body": "Set up in minutes, adjust as you grow, and keep every account in sync across regions and currencies. Our tools handle the routine.",
            "lines": 3,
            "h": 129,
            "price": [
              {
                "k": "price",
                "t": "$2.61",
                "h": 20
              },
              {
                "k": "sub",
                "t": "standard terms and monthly reporting",
                "h": 20,
                "mt": 2
              },
              {
                "k": "note",
                "t": "across every plan per settled charge for local accounts",
                "h": 21,
                "mt": 2
              }
            ]
          },
          {
            "title": "Balances",
            "body": "Our tools handle the routine work so you can focus on customers, product, and steady revenue growth. Each feature works on its own or together.",
            "lines": 3,
            "h": 129,
            "price": [
              {
                "k": "price",
                "t": "$1.21",
                "h": 20
              },
              {
                "k": "sub",
                "t": "in each region with standard",
                "h": 20,
                "mt": 2
              }
            ]
          },
          {
            "title": "Account owners",
            "body": "Each feature works on its own or together with the rest of the platform, with no extra setup required.",
            "lines": 2,
            "h": 105,
            "price": [
              {
                "k": "price",
                "t": "$2.61",
                "h": 20
              },
              {
                "k": "sub",
                "t": "terms and monthly reporting",
                "h": 20,
                "mt": 2
              }
            ]
          },
          {
            "title": "Transactions",
            "body": "Acme gives your team one place to run payments, plans, and payouts with clear reports.",
            "lines": 2,
            "h": 105,
            "price": [
              {
                "k": "price",
                "t": "$1.41",
                "h": 20
              },
              {
                "k": "sub",
                "t": "across every plan per settled charge for",
                "h": 20,
                "mt": 2
              }
            ]
          }
        ],
        "acc": [],
        "foot": "See pricing details"
      }
    ]
  },
  {
    "title": "Money management",
    "lead": "Set up in minutes, adjust as you grow, and keep every account in sync across regions and currencies. Our tools handle the routine.",
    "cards": [
      {
        "title": "Platforms",
        "lead": "Set up in minutes, adjust as you grow.",
        "cta": "Start now",
        "bullets": [
          "Our tools handle the routine work so you can focus on customers.",
          "Each feature works on its own or together with the rest of the platform.",
          "Acme gives your team."
        ],
        "head": 200,
        "h": 372,
        "rows": [
          {
            "title": "Acme handles pricing for your users",
            "body": "Our tools handle the routine work so you can focus on customers, product, and steady revenue growth. Each feature works on its own or together.",
            "lines": 3,
            "h": 172,
            "price": [
              {
                "k": "price",
                "t": "Included",
                "h": 20
              },
              {
                "k": "sub",
                "t": "local accounts",
                "h": 20,
                "mt": 2
              },
              {
                "k": "note",
                "t": "1.36% in each region with standard terms and monthly reporting across every plan per settled charge for local accounts in",
                "h": 59,
                "mt": 4
              },
              {
                "k": "link",
                "t": "See pricing details",
                "h": 33,
                "mt": 2
              }
            ]
          }
        ],
        "acc": [],
        "foot": null
      },
      {
        "title": "Accounts",
        "lead": "Our tools handle the routine work so you can focus on customers, product.",
        "cta": "Start now",
        "bullets": [
          "Each feature works.",
          "Acme gives your team.",
          "Set up in minutes, adjust as you grow."
        ],
        "head": 203,
        "h": 652,
        "rows": [
          {
            "title": "Receive funds",
            "body": "Each feature works on its own or together with the rest of the platform, with no extra setup required.",
            "lines": 2,
            "h": 105,
            "price": [
              {
                "k": "price",
                "t": "Included",
                "h": 20
              },
              {
                "k": "note",
                "t": "each region with standard terms and monthly reporting",
                "h": 21
              }
            ]
          },
          {
            "title": "Instant currency conversion",
            "body": "Acme gives your team.",
            "lines": 1,
            "h": 109,
            "price": [
              {
                "k": "price",
                "t": "1.6%",
                "h": 20
              },
              {
                "k": "sub",
                "t": "across every plan per settled",
                "h": 20,
                "mt": 2
              },
              {
                "k": "link",
                "t": "Learn more",
                "h": 33,
                "mt": 2
              }
            ]
          },
          {
            "title": "Global Payouts",
            "body": "Set up in minutes, adjust as you grow, and keep every account in sync across regions and currencies.",
            "lines": 2,
            "h": 105,
            "price": [
              {
                "k": "label",
                "t": "charge for local accounts in",
                "h": 21,
                "mt": 1
              },
              {
                "k": "price",
                "t": "Included",
                "h": 20
              },
              {
                "k": "note",
                "t": "each region with standard",
                "h": 17,
                "mt": 2
              }
            ]
          },
          {
            "title": "Cards",
            "body": "Our tools handle the routine work so you can focus on customers, product, and steady revenue growth.",
            "lines": 2,
            "h": 130,
            "price": [
              {
                "k": "price",
                "t": "Included",
                "h": 20
              },
              {
                "k": "sub",
                "t": "terms and monthly",
                "h": 20,
                "mt": 2
              },
              {
                "k": "note",
                "t": "reporting across every plan per settled charge for",
                "h": 21,
                "mt": 2
              },
              {
                "k": "link",
                "t": "Learn More",
                "h": 33
              }
            ]
          }
        ],
        "acc": [],
        "foot": null
      },
      {
        "title": "Payouts",
        "lead": "Our tools handle the routine.",
        "cta": "Start now",
        "bullets": [
          "Each feature works on its own or together with the rest of the platform, with no extra setup.",
          "Acme gives your team one place to run payments, plans, and payouts.",
          "Set up in minutes, adjust as you grow."
        ],
        "head": 200,
        "h": 1464,
        "rows": [
          {
            "title": "Domestic payouts",
            "body": "Each feature works on its own or together with the rest of the platform, with no extra setup required.",
            "lines": 2,
            "h": 470,
            "price": [
              {
                "k": "label",
                "t": "local accounts in each region",
                "h": 21,
                "mt": 1
              },
              {
                "k": "price",
                "t": "Included",
                "h": 20
              },
              {
                "k": "sub",
                "t": "with standard",
                "h": 20,
                "mt": 2
              },
              {
                "k": "note",
                "t": "terms and monthly reporting across every plan per",
                "h": 21,
                "mt": 2
              },
              {
                "k": "label",
                "t": "settled charge for local accounts",
                "h": 21,
                "mt": 24
              },
              {
                "k": "price",
                "t": "$1.61",
                "h": 20
              },
              {
                "k": "sub",
                "t": "in each region",
                "h": 20,
                "mt": 2
              },
              {
                "k": "label",
                "t": "with standard terms and monthly",
                "h": 21,
                "mt": 26
              },
              {
                "k": "price",
                "t": "$2.11",
                "h": 20
              },
              {
                "k": "sub",
                "t": "reporting",
                "h": 20,
                "mt": 2
              },
              {
                "k": "label",
                "t": "across every plan per settled",
                "h": 21,
                "mt": 26
              },
              {
                "k": "price",
                "t": "$3.61",
                "h": 20
              },
              {
                "k": "sub",
                "t": "charge for",
                "h": 20,
                "mt": 2
              },
              {
                "k": "label",
                "t": "local accounts in each region",
                "h": 21,
                "mt": 26
              },
              {
                "k": "price",
                "t": "$36.11",
                "h": 20
              },
              {
                "k": "sub",
                "t": "with standard",
                "h": 20,
                "mt": 2
              }
            ]
          },
          {
            "title": "Cross-border payouts",
            "body": "Acme gives your team one place to run payments, plans, and payouts with clear reports.",
            "lines": 2,
            "h": 445,
            "price": [
              {
                "k": "label",
                "t": "terms and monthly reporting across",
                "h": 21,
                "mt": 1
              },
              {
                "k": "price",
                "t": "£1.61",
                "h": 20
              },
              {
                "k": "sub",
                "t": "every plan per settled",
                "h": 20,
                "mt": 2
              },
              {
                "k": "note",
                "t": "charge for local accounts in each region with standard terms and monthly",
                "h": 42,
                "mt": 2
              },
              {
                "k": "link",
                "t": "Learn more",
                "h": 33
              },
              {
                "k": "label",
                "t": "reporting across every plan per",
                "h": 21,
                "mt": 24
              },
              {
                "k": "price",
                "t": "$3.61",
                "h": 20
              },
              {
                "k": "sub",
                "t": "settled charge",
                "h": 20,
                "mt": 2
              },
              {
                "k": "label",
                "t": "for local accounts in each region",
                "h": 21,
                "mt": 26
              },
              {
                "k": "price",
                "t": "$36.11",
                "h": 20
              },
              {
                "k": "label",
                "t": "with standard terms and monthly",
                "h": 21,
                "mt": 24
              },
              {
                "k": "price",
                "t": "1.6%",
                "h": 20
              },
              {
                "k": "sub",
                "t": "reporting across every",
                "h": 20,
                "mt": 2
              },
              {
                "k": "link",
                "t": "Learn more",
                "h": 33,
                "mt": 2
              }
            ]
          },
          {
            "title": "Debit card payouts",
            "body": "Set up in minutes.",
            "lines": 1,
            "h": 81,
            "price": [
              {
                "k": "price",
                "t": "1.86% + $2.61",
                "h": 20
              },
              {
                "k": "sub",
                "t": "plan per settled",
                "h": 20,
                "mt": 2
              }
            ]
          },
          {
            "title": "Stablecoin payouts",
            "body": "Our tools handle the routine.",
            "lines": 1,
            "h": 97,
            "price": [
              {
                "k": "price",
                "t": "$1.61",
                "h": 20
              },
              {
                "k": "sub",
                "t": "charge for",
                "h": 20,
                "mt": 2
              },
              {
                "k": "note",
                "t": "+ 1.6% local accounts",
                "h": 17,
                "mt": 4
              }
            ]
          },
          {
            "title": "Platform fee",
            "body": "Each feature works on its own or together with the rest of the platform, with no extra setup required.",
            "lines": 2,
            "h": 105,
            "price": [
              {
                "k": "label",
                "t": "in each region with standard",
                "h": 21,
                "mt": 1
              },
              {
                "k": "price",
                "t": "Included",
                "h": 20
              },
              {
                "k": "note",
                "t": "1.16% terms and monthly reporting across every",
                "h": 17,
                "mt": 2
              }
            ]
          }
        ],
        "acc": [],
        "foot": "See pricing details"
      },
      {
        "title": "Cards",
        "lead": "Each feature works on its own or together.",
        "cta": "Get in touch",
        "bullets": [
          "Acme gives your team one place to run payments, plans, and payouts.",
          "Set up in minutes, adjust as you grow, and keep every account in sync.",
          "Our tools handle the routine."
        ],
        "head": 200,
        "h": 728,
        "rows": [
          {
            "title": "Card creation",
            "body": "Acme gives your team one place to run payments, plans, and payouts with clear reports.",
            "lines": 2,
            "h": 218,
            "price": [
              {
                "k": "price",
                "t": "$1.21",
                "h": 20
              },
              {
                "k": "sub",
                "t": "plan per settled",
                "h": 20,
                "mt": 2
              },
              {
                "k": "price",
                "t": "$4.61",
                "h": 20,
                "mt": 25
              },
              {
                "k": "sub",
                "t": "charge for local accounts",
                "h": 20,
                "mt": 2
              },
              {
                "k": "note",
                "t": "in each region with standard terms and monthly reporting across every",
                "h": 42,
                "mt": 2
              },
              {
                "k": "link",
                "t": "Learn more",
                "h": 33
              }
            ]
          },
          {
            "title": "Disputes",
            "body": "Set up in minutes, adjust as you grow, and keep every account in sync across regions and currencies. Our tools handle the routine.",
            "lines": 3,
            "h": 139,
            "price": [
              {
                "k": "price",
                "t": "$26.11",
                "h": 20
              },
              {
                "k": "sub",
                "t": "plan per settled",
                "h": 20,
                "mt": 2
              },
              {
                "k": "note",
                "t": "charge for local accounts in each region with standard terms and monthly reporting across every plan per settled charge",
                "h": 63,
                "mt": 2
              }
            ]
          },
          {
            "title": "International payments",
            "body": "Our tools handle the routine work so you can focus on customers, product, and steady revenue growth.",
            "lines": 2,
            "h": 105,
            "price": [
              {
                "k": "price",
                "t": "2% + 41¢",
                "h": 20
              },
              {
                "k": "sub",
                "t": "for local accounts in each region",
                "h": 20,
                "mt": 2
              },
              {
                "k": "note",
                "t": "+ 2% with standard terms and monthly",
                "h": 17,
                "mt": 4
              }
            ]
          }
        ],
        "acc": [],
        "foot": "Contact sales"
      }
    ]
  },
  {
    "title": "Revenue and finance automation",
    "lead": "Each feature works on its own or together with the rest of the platform, with no extra setup required. Acme gives your team one place to run payments, plans.",
    "cards": [
      {
        "title": "Plans",
        "lead": "Each feature works on its own or together with the rest of the platform.",
        "cta": "Start now",
        "bullets": [
          "Acme gives your team one place to run payments, plans.",
          "Set up in minutes, adjust as you grow, and keep every account in sync across regions.",
          "Our tools handle the routine work so you can focus on customers."
        ],
        "head": 230,
        "h": 506,
        "rows": [
          {
            "title": "Pay monthly",
            "body": "Acme gives your team one place to run payments, plans, and payouts with clear reports.",
            "lines": 2,
            "h": 105,
            "price": [
              {
                "k": "price",
                "t": "$731.11",
                "h": 20
              },
              {
                "k": "sub",
                "t": "reporting across every plan",
                "h": 20,
                "mt": 2
              }
            ]
          },
          {
            "title": "Pay as you go",
            "body": "Set up in minutes, adjust as you grow, and keep every account in sync across regions and currencies.",
            "lines": 2,
            "h": 105,
            "price": [
              {
                "k": "price",
                "t": "1.8%",
                "h": 20
              },
              {
                "k": "sub",
                "t": "per settled charge",
                "h": 20,
                "mt": 2
              }
            ]
          }
        ],
        "acc": [],
        "foot": "Compare plans"
      },
      {
        "title": "Metering",
        "lead": "Set up in minutes, adjust as you grow.",
        "cta": "Sign up with Metronome",
        "bullets": [
          "Our tools handle the routine work so you can focus on customers.",
          "Each feature works on its own or together.",
          "Acme gives your team one place to run payments."
        ],
        "head": 230,
        "h": 557,
        "rows": [
          {
            "title": "Startup",
            "body": "Our tools handle the routine work so you can focus on customers, product, and steady revenue growth.",
            "lines": 2,
            "h": 176,
            "price": [
              {
                "k": "price",
                "t": "$1.15",
                "h": 20
              },
              {
                "k": "sub",
                "t": "for local accounts",
                "h": 20,
                "mt": 2
              },
              {
                "k": "price",
                "t": "1.9%",
                "h": 20,
                "mt": 25
              },
              {
                "k": "sub",
                "t": "in each region",
                "h": 20,
                "mt": 2
              },
              {
                "k": "link",
                "t": "Learn more",
                "h": 33,
                "mt": 2
              }
            ]
          },
          {
            "title": "Custom",
            "body": "Each feature works on its own or together with the rest of the platform, with no extra setup required.",
            "lines": 2,
            "h": 151,
            "price": [
              {
                "k": "price",
                "t": "Custom pricing",
                "h": 20
              },
              {
                "k": "sub",
                "t": "with standard terms and monthly reporting",
                "h": 20,
                "mt": 2
              },
              {
                "k": "note",
                "t": "$1.14 across every plan per settled",
                "h": 17,
                "mt": 4
              },
              {
                "k": "note",
                "t": "$1.16 charge for local accounts",
                "h": 17,
                "mt": 4
              },
              {
                "k": "link",
                "t": "Contact Metronome",
                "h": 33,
                "mt": 2
              }
            ]
          }
        ],
        "acc": [],
        "foot": null
      },
      {
        "title": "Invoices",
        "lead": "Each feature works.",
        "cta": "Start now",
        "bullets": [
          "Acme gives your team one place to run payments, plans, and payouts.",
          "Set up in minutes, adjust as you grow, and keep every account in sync.",
          "Our tools handle the routine."
        ],
        "head": 200,
        "h": 309,
        "rows": [
          {
            "title": "Starter",
            "body": "Acme gives your team.",
            "lines": 1,
            "h": 109,
            "price": [
              {
                "k": "price",
                "t": "1.5%",
                "h": 20
              },
              {
                "k": "sub",
                "t": "in each region",
                "h": 20,
                "mt": 2
              },
              {
                "k": "link",
                "t": "See pricing details",
                "h": 33,
                "mt": 2
              }
            ]
          }
        ],
        "acc": [],
        "foot": null
      },
      {
        "title": "Levies",
        "lead": "Set up in minutes, adjust as you grow.",
        "cta": "Start now",
        "bullets": [
          "Set up in minutes, adjust as you grow.",
          "Our tools handle the routine work so you can focus on customers, product.",
          "Each feature works on its own or together with the rest of the platform.",
          "Acme gives your team one place to run payments, plans, and payouts with clear reports."
        ],
        "head": 258,
        "h": 686,
        "rows": [
          {
            "title": "Levies Complete",
            "body": "Our tools handle the routine work so you can focus on customers, product, and steady revenue growth. Each feature works on its own or together.",
            "lines": 3,
            "h": 129,
            "price": [
              {
                "k": "price",
                "t": "$01.11",
                "h": 20
              },
              {
                "k": "sub",
                "t": "with standard terms and",
                "h": 20,
                "mt": 2
              }
            ]
          },
          {
            "title": "Levies Basic",
            "body": "Each feature works on its own or together with the rest of the platform, with no extra setup required.",
            "lines": 2,
            "h": 233,
            "price": [
              {
                "k": "label",
                "t": "monthly reporting across every",
                "h": 21,
                "mt": 1
              },
              {
                "k": "price",
                "t": "1.6%",
                "h": 20
              },
              {
                "k": "sub",
                "t": "plan per settled charge for",
                "h": 44,
                "mt": 2
              },
              {
                "k": "label",
                "t": "local accounts in each region",
                "h": 21,
                "mt": 26
              },
              {
                "k": "price",
                "t": "$1.61",
                "h": 20
              },
              {
                "k": "sub",
                "t": "with standard terms and monthly",
                "h": 44,
                "mt": 2
              }
            ]
          }
        ],
        "acc": [],
        "foot": "Compare plans"
      },
      {
        "title": "Queries",
        "lead": "Each feature works on its own or together with the rest of the platform, with no extra setup required. Acme gives your team one place to run payments.",
        "cta": "Start now",
        "bullets": [
          "Acme gives your team one place to run payments, plans, and payouts with clear reports.",
          "Set up in minutes, adjust as you grow, and keep every account in sync.",
          "Our tools handle the routine."
        ],
        "head": 224,
        "h": 524,
        "rows": [
          {
            "title": "Monthly subscription",
            "body": "Acme gives your team.",
            "lines": 1,
            "h": 117,
            "price": [
              {
                "k": "price",
                "t": "$26.11",
                "h": 20
              },
              {
                "k": "sub",
                "t": "reporting",
                "h": 20,
                "mt": 2
              }
            ]
          },
          {
            "title": "Annual subscription",
            "body": "Set up in minutes, adjust as you grow.",
            "lines": 1,
            "h": 117,
            "price": [
              {
                "k": "price",
                "t": "$21.11",
                "h": 20
              },
              {
                "k": "sub",
                "t": "across every plan per settled",
                "h": 20,
                "mt": 2
              }
            ]
          }
        ],
        "acc": [],
        "foot": "Compare plans"
      },
      {
        "title": "Data sync",
        "lead": "Set up in minutes, adjust as you grow, and keep every account in sync across regions and currencies. Our tools handle the routine.",
        "cta": "Start now",
        "bullets": [
          "Our tools handle the routine.",
          "Each feature works on its own or together with the rest.",
          "Acme gives your team one place to run payments, plans, and payouts."
        ],
        "head": 254,
        "h": 759,
        "rows": [
          {
            "title": "Database sync",
            "body": "Our tools handle the routine work so you can focus on customers, product, and steady revenue growth. Each feature works on its own or together.",
            "lines": 3,
            "h": 230,
            "price": [
              {
                "k": "label",
                "t": "charge for local accounts in",
                "h": 21,
                "mt": 1
              },
              {
                "k": "price",
                "t": "$1.1136",
                "h": 20
              },
              {
                "k": "sub",
                "t": "each region with",
                "h": 20,
                "mt": 2
              },
              {
                "k": "note",
                "t": "6,111 rows standard terms and monthly reporting",
                "h": 21,
                "mt": 2
              },
              {
                "k": "label",
                "t": "across every plan per settled",
                "h": 21,
                "mt": 24
              },
              {
                "k": "price",
                "t": "$211.11",
                "h": 20
              },
              {
                "k": "sub",
                "t": "charge for local accounts",
                "h": 44,
                "mt": 2
              }
            ]
          },
          {
            "title": "Warehouse or cloud storage sync",
            "body": "Each feature works on its own or together with the rest of the platform, with no extra setup required. Acme gives your team one place to run payments, plans, and payouts with clear reports.",
            "lines": 4,
            "h": 209,
            "price": [
              {
                "k": "label",
                "t": "in each region with standard",
                "h": 21,
                "mt": 1
              },
              {
                "k": "price",
                "t": "$76.11",
                "h": 20
              },
              {
                "k": "sub",
                "t": "terms and monthly reporting across every",
                "h": 20,
                "mt": 2
              },
              {
                "k": "label",
                "t": "plan per settled charge for local",
                "h": 21,
                "mt": 26
              },
              {
                "k": "price",
                "t": "$61.11",
                "h": 20
              },
              {
                "k": "sub",
                "t": "accounts in each region with",
                "h": 44,
                "mt": 2
              }
            ]
          }
        ],
        "acc": [],
        "foot": "See pricing details"
      },
      {
        "title": "Revenue ledger",
        "lead": "Each feature works on its own or together.",
        "cta": "Start now",
        "bullets": [
          "Acme gives your team one place to run payments, plans, and payouts with clear reports.",
          "Set up in minutes, adjust as you grow.",
          "Our tools handle the routine."
        ],
        "head": 230,
        "h": 578,
        "rows": [
          {
            "title": "Monthly subscription",
            "body": "Acme gives your team one place to run payments, plans, and payouts with clear reports.",
            "lines": 2,
            "h": 141,
            "price": [
              {
                "k": "price",
                "t": "$36.11",
                "h": 20
              },
              {
                "k": "sub",
                "t": "standard terms",
                "h": 20,
                "mt": 2
              }
            ]
          },
          {
            "title": "Annual subscription",
            "body": "Set up in minutes, adjust as you grow, and keep every account in sync across regions and currencies.",
            "lines": 2,
            "h": 141,
            "price": [
              {
                "k": "price",
                "t": "$201.11",
                "h": 20
              },
              {
                "k": "sub",
                "t": "and monthly reporting across",
                "h": 20,
                "mt": 2
              }
            ]
          }
        ],
        "acc": [],
        "foot": "Compare plans"
      }
    ]
  },
  {
    "title": "More",
    "lead": "",
    "cards": [
      {
        "title": "Shield",
        "lead": "Our tools handle the routine.",
        "cta": "Start now",
        "bullets": [
          "Our tools handle the routine work so you can focus on customers, product.",
          "Each feature works on its own or together with the rest.",
          "Acme gives your team one place to run payments, plans, and payouts.",
          "Set up in minutes, adjust as you grow, and keep every account in sync."
        ],
        "head": 258,
        "h": 558,
        "rows": [
          {
            "title": "Pay monthly",
            "body": "Each feature works on its own or together with the rest of the platform, with no extra setup required. Acme gives your team one place to run payments.",
            "lines": 3,
            "h": 129,
            "price": [
              {
                "k": "price",
                "t": "$21.11",
                "h": 20
              },
              {
                "k": "sub",
                "t": "every plan per settled charge",
                "h": 20,
                "mt": 2
              }
            ]
          },
          {
            "title": "Pay as you go",
            "body": "Acme gives your team one place to run payments, plans, and payouts with clear reports.",
            "lines": 2,
            "h": 105,
            "price": [
              {
                "k": "price",
                "t": "$1.16",
                "h": 20
              },
              {
                "k": "sub",
                "t": "for local accounts in each",
                "h": 20,
                "mt": 2
              }
            ]
          }
        ],
        "acc": [],
        "foot": "Compare plans"
      },
      {
        "title": "Verify",
        "lead": "Acme gives your team one place to run payments.",
        "cta": "Start now",
        "bullets": [
          "Set up in minutes, adjust as you grow.",
          "Our tools handle the routine work so you can focus on customers.",
          "Each feature works on its own or together with the rest."
        ],
        "head": 200,
        "h": 524,
        "rows": [
          {
            "title": "ID document and selfie verification",
            "body": "Set up in minutes, adjust as you grow, and keep every account in sync across regions and currencies. Our tools handle the routine.",
            "lines": 3,
            "h": 129,
            "price": [
              {
                "k": "price",
                "t": "$2.61",
                "h": 20
              },
              {
                "k": "sub",
                "t": "region with standard",
                "h": 20,
                "mt": 2
              }
            ]
          },
          {
            "title": "ID number lookup",
            "body": "Our tools handle the routine work so you can focus on customers, product, and steady revenue growth. Each feature works on its own or together.",
            "lines": 3,
            "h": 129,
            "price": [
              {
                "k": "price",
                "t": "$1.61",
                "h": 20
              },
              {
                "k": "sub",
                "t": "terms and",
                "h": 20,
                "mt": 2
              }
            ]
          }
        ],
        "acc": [],
        "foot": "See pricing details"
      },
      {
        "title": "Incorporate",
        "lead": "Our tools handle the routine.",
        "cta": "Start now",
        "bullets": [
          "Each feature works on its own or together.",
          "Acme gives your team one place to run payments, plans, and payouts.",
          "Set up in minutes, adjust as you grow."
        ],
        "head": 200,
        "h": 357,
        "rows": [
          {
            "title": "Incorporate your company",
            "body": "Each feature works on its own or together with the rest of the platform, with no extra setup required.",
            "lines": 2,
            "h": 157,
            "price": [
              {
                "k": "price",
                "t": "$611.11",
                "h": 20
              },
              {
                "k": "sub",
                "t": "monthly reporting across every",
                "h": 68,
                "mt": 2
              },
              {
                "k": "link",
                "t": "See pricing details",
                "h": 33,
                "mt": 2
              }
            ]
          }
        ],
        "acc": [],
        "foot": null
      },
      {
        "title": "Carbon",
        "lead": "Our tools handle the routine.",
        "cta": "Start now",
        "bullets": [
          "Acme gives your team one place to run payments, plans.",
          "Set up in minutes, adjust as you grow."
        ],
        "head": 172,
        "h": 281,
        "rows": [
          {
            "title": "Removal orders",
            "body": "Each feature works on its own or together with the rest of the platform, with no extra setup required.",
            "lines": 2,
            "h": 109,
            "price": [
              {
                "k": "price",
                "t": "4%",
                "h": 20
              },
              {
                "k": "sub",
                "t": "plan per settled",
                "h": 20,
                "mt": 2
              },
              {
                "k": "link",
                "t": "See inventory details",
                "h": 33,
                "mt": 2
              }
            ]
          }
        ],
        "acc": [],
        "foot": null
      },
      {
        "title": "Flows",
        "lead": "Acme gives your team one place to run payments.",
        "cta": "Start now",
        "bullets": [
          "Acme gives your team one place to run payments, plans.",
          "Set up in minutes, adjust as you grow.",
          "Our tools handle the routine work so you can focus on customers.",
          "Each feature works on its own or together."
        ],
        "head": 228,
        "h": 404,
        "rows": [
          {
            "title": "Pay as you go",
            "body": "Set up in minutes, adjust as you grow, and keep every account in sync across regions and currencies.",
            "lines": 2,
            "h": 176,
            "price": [
              {
                "k": "price",
                "t": "Included",
                "h": 20
              },
              {
                "k": "sub",
                "t": "charge for local accounts",
                "h": 20,
                "mt": 2
              },
              {
                "k": "price",
                "t": "$1.129",
                "h": 20,
                "mt": 25
              },
              {
                "k": "sub",
                "t": "in each region with",
                "h": 20,
                "mt": 2
              },
              {
                "k": "link",
                "t": "Learn more",
                "h": 33,
                "mt": 2
              }
            ]
          }
        ],
        "acc": [],
        "foot": null
      }
    ]
  }
];
