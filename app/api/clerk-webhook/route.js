import prisma from "@/libs/prisma";

// Export a POST handler for Next.js App Router
export async function POST(req) {
  try {
    // Parse the request body
    const event = await req.json();

    // Handle "user.created" event
    if (event.type === "user.created" || event.type === "user.updated") {
      // Extract the user data from the event
      const {
        id,
        username,
        first_name: firstName,
        last_name: lastName,
        email_addresses,
        phone_numbers,
        avatar_url: avatarUrl,
        last_sign_in_at = "",
        organisations: orgs = undefined,
        roles: rolesJson = undefined,
      } = event.data;

      // Save the whole event data as JSON
      const json = { event };

      // emails
      const emails = email_addresses.map((email) => ({
        email: email.email_address,
      }));

      // phone numbers
      const phoneNumbers = phone_numbers.map((phone) => ({
        phone: phone.phone_number,
      }));

      // organisations - Not sure if this exists
      const organisations = orgs
        ? orgs.map((org) => ({
            organisation: org.organisation,
          }))
        : "";

      const roles = rolesJson
        ? rolesJson.map((role) => ({
            ["role"]: role.role,
          }))
        : "";

      const lastSignInAt = last_sign_in_at ? new Date(last_sign_in_at).toISOString() : null;

      // FUTURE: Add support for organisations & roles
      // UNSURE of the structure of the organisations and roles
      // const roles = JSON.stringify(roles.map((role,i) => {role: role.role}));

      const obj = { emails, organisations, json, lastSignInAt, username, phoneNumbers, avatarUrl, roles, firstName, lastName };

      // Upsert the profile using Prisma
      await prisma.profiles.upsert({
        where: { userId: id },
        create: { userId: id, ...obj },
        update: { ...obj },
      });

      return new Response(JSON.stringify({ message: "Webhook processed" }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } else {
      return new Response(JSON.stringify({ message: "Event not supported" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

/*  example of event data

{6 items
"data":{39 items
"backup_code_enabled":boolfalse
"banned":boolfalse
"create_organization_enabled":booltrue
"created_at":float1741116629210
"delete_self_enabled":booltrue
"email_addresses":[2 items
0:{9 items
"created_at":float1741117567869
"email_address":string"waynekaminsky@gmail.com"
"id":string"idn_2trkQvHmRKGdxZvqhTUd6s6n95V"
"linked_to":[1 item
0:{2 items
"id":string"idn_2trkQKZkV91Z3Wb6v8g7QMah0qy"
"type":string"oauth_google"
}
]
"matches_sso_connection":boolfalse
"object":string"email_address"
"reserved":boolfalse
"updated_at":float1741117567869
"verification":{4 items
"attempts":NULL
"expire_at":NULL
"status":string"verified"
"strategy":string"from_oauth_google"
}
}
1:{9 items
"created_at":float1741116581748
"email_address":string"wayne@thinkshift-ai.com"
"id":string"idn_2triQzg3MhncjWT3SkkqyRMeHkd"
"linked_to":[]0 items
"matches_sso_connection":boolfalse
"object":string"email_address"
"reserved":boolfalse
"updated_at":float1741116629229
"verification":{4 items
"attempts":int1
"expire_at":float1741117182344
"status":string"verified"
"strategy":string"email_code"
}
}
]
"enterprise_accounts":[]0 items
"external_accounts":[1 item
0:{22 items
"approved_scopes":string"email https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile openid profile"
"avatar_url":string"https://lh3.googleusercontent.com/a/ACg8ocLuXzexaybe8fTChubuX7tJLJxCUc7TgBBbgeHD6TioxTGb1CB-=s1000-c"
"created_at":float1741117563537
"email_address":string"waynekaminsky@gmail.com"
"external_account_id":string"eac_2trkQPGz15TpCApvVeFkOzZdTzK"
"family_name":string"Kaminsky"
"first_name":string"Wayne"
"given_name":string"Wayne"
"google_id":string"116163796789148619122"
"id":string"idn_2trkQKZkV91Z3Wb6v8g7QMah0qy"
"identification_id":string"idn_2trkQKZkV91Z3Wb6v8g7QMah0qy"
"image_url":string"https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BQ2c4b2NMdVh6ZXhheWJlOGZUQ2h1YnVYN3RKTEp4Q1VjN1RnQkJiZ2VIRDZUaW94VEdiMUNCLT1zMTAwMC1jIiwicyI6InhPaHJRcjZHa3ZFQldYN2tlSkpxSDhQejdtd0EyTXB2L3l6NE5tK2FHUnMifQ"
"label":NULL
"last_name":string"Kaminsky"
"object":string"google_account"
"picture":string"https://lh3.googleusercontent.com/a/ACg8ocLuXzexaybe8fTChubuX7tJLJxCUc7TgBBbgeHD6TioxTGb1CB-=s1000-c"
"provider":string"oauth_google"
"provider_user_id":string"116163796789148619122"
"public_metadata":{}0 items
"updated_at":float1741117600700
"username":string""
"verification":{4 items
"attempts":NULL
"expire_at":float1741118163529
"status":string"verified"
"strategy":string"oauth_google"
}
}
]
"external_id":NULL
"first_name":string"Wayne"
"has_image":booltrue
"id":string"user_2triWx4gUiPbnuEs18yMY182t7E"
"image_url":string"https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BQ2c4b2NMdVh6ZXhheWJlOGZUQ2h1YnVYN3RKTEp4Q1VjN1RnQkJiZ2VIRDZUaW94VEdiMUNCLT1zMTAwMC1jIiwicyI6InhPaHJRcjZHa3ZFQldYN2tlSkpxSDhQejdtd0EyTXB2L3l6NE5tK2FHUnMifQ"
"last_active_at":float1741116629209
"last_name":string"Kaminsky"
"last_sign_in_at":float1741166232215
"legal_accepted_at":NULL
"locked":boolfalse
"lockout_expires_in_seconds":NULL
"mfa_disabled_at":NULL
"mfa_enabled_at":NULL
"object":string"user"
"passkeys":[]0 items
"password_enabled":booltrue
"phone_numbers":[1 item
0:{11 items
"backup_codes":NULL
"created_at":float1741116581753
"default_second_factor":boolfalse
"id":string"idn_2triR1ry7n2VNzPlJGcQWUolqpl"
"linked_to":[]0 items
"object":string"phone_number"
"phone_number":string"+447562212249"
"reserved":boolfalse
"reserved_for_second_factor":boolfalse
"updated_at":float1741116629220
"verification":{4 items
"attempts":int1
"expire_at":float1741117203408
"status":string"verified"
"strategy":string"phone_code"
}
}
]
"primary_email_address_id":string"idn_2triQzg3MhncjWT3SkkqyRMeHkd"
"primary_phone_number_id":string"idn_2triR1ry7n2VNzPlJGcQWUolqpl"
"primary_web3_wallet_id":NULL
"private_metadata":{}0 items
"profile_image_url":string"https://lh3.googleusercontent.com/a/ACg8ocLuXzexaybe8fTChubuX7tJLJxCUc7TgBBbgeHD6TioxTGb1CB-=s1000-c"
"public_metadata":{}0 items
"saml_accounts":[]0 items
"totp_enabled":boolfalse
"two_factor_enabled":boolfalse
"unsafe_metadata":{}0 items
"updated_at":float1741199489736
"username":string"heywaynek22"
"verification_attempts_remaining":int10
"web3_wallets":[]0 items
}
"event_attributes":{1 item
"http_request":{2 items
"client_ip":string"2a0a:ef40:1184:6801:69ed:eae1:8a04:19b5"
"user_agent":string"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36"
}
}
"instance_id":string"ins_2toEMFnzCvk2klIFSGj7nfp5Od2"
"object":string"event"
"timestamp":float1741199489741
"type":string"user.updated"
}

*/
